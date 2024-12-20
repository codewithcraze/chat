import indexRoutes from './routes/index.js'
import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import createHttpError from 'http-errors';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
// Helmet
app.use(helmet());

// Mongo Sanitize
app.use(mongoSanitize());

// Enable Cookie Parser
app.use(cookieParser());

// Compression
app.use(compression());

// File Upload
app.use(fileUpload({
    useTempFiles : true,
}))

// Enable CORS
app.use(cors());

// Mongodb Connection


// Dev Mode. 
console.log(process.env.NODE_ENV);

app.use('/api/v1', indexRoutes);


app.use(async(req, res, next) => {
    next(createHttpError.NotFound('endpoint does not exist!'));
})

app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});


export default app;