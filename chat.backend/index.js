import cluster from "cluster";
import os from "os";
import app from "./app.js";
import logger from "./configs/logger.js";
import mongoose from "mongoose";


const PORT = process.env.PORT || 5000;
const numCPUs = os.cpus().length;

// mongodb connection error handler.
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

// mongodb debug mode.
if(process.env.NODE_ENV === "development"){
  mongoose.set("debug", true);
}

// mongodb connection mode.
mongoose.connect(process.env.MONGODB_URI).then(() => {
  logger.info("Connected to MongoDB");
})

// Clustering code
// if (cluster.isPrimary) {
//   // Master process: fork workers
//   logger.info(`Primary process ${process.pid} is running`);
//   logger.info(`Forking ${numCPUs} workers...`);

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   // Listen for worker exit events
//   cluster.on("exit", (worker, code, signal) => {
//     logger.error(`Worker ${worker.process.pid} exited with code ${code}, signal ${signal}`);
//     logger.info("Starting a new worker...");
//     cluster.fork(); // Automatically restart the worker
//   });
// } else {

{
  // Worker process: start the server
  let server;

  server = app.listen(PORT, () => {
    logger.info(`Worker ${process.pid} started, server running on port ${PORT}`);
  });

  // Graceful shutdown handler
  const exitHandler = (exitCode = 0) => {
    if (server) {
      logger.info(`Worker ${process.pid} shutting down...`);
      server.close(() => {
        logger.info(`Worker ${process.pid} closed successfully.`);
        process.exit(exitCode);
      });
    } else {
      process.exit(exitCode);
    }
  };

  // Handle unexpected errors
  const unexpectedErrorHandler = (error) => {
    logger.error(`Unexpected Error in worker ${process.pid}: ${error.message || error}`);
    logger.error(error.stack);
    exitHandler(1);
  };

  // Listen for uncaught exceptions and unhandled promise rejections
  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  // Handle SIGTERM for graceful shutdown (e.g., when stopping with Docker or PM2)
  process.on("SIGTERM", () => {
    logger.info(`Worker ${process.pid} received SIGTERM, shutting down gracefully...`);
    exitHandler(0);
  });
}
