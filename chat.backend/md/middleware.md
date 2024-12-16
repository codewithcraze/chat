# Express Middleware Usage in Application

This README provides an overview of the middlewares used in this Express application, their purpose, and basic setup.

## Table of Contents

1. [Compression](#compression)
2. [Cookie-Parser](#cookie-parser)
3. [CORS](#cors)
4. [Cross-Env](#cross-env)
5. [Dotenv](#dotenv)
6. [Express-FileUpload](#express-fileupload)
7. [Express-Mongo-Sanitize](#express-mongo-sanitize)
8. [Helmet](#helmet)
9. [Morgan](#morgan)
10. [Nodemon](#nodemon)

---

## Dependencies

Here's a list of the middleware packages used in the application:

```json
"compression": "^1.7.5",
"cookie-parser": "^1.4.7",
"cors": "^2.8.5",
"cross-env": "^7.0.3",
"dotenv": "^16.4.7",
"express": "^4.21.2",
"express-fileupload": "^1.5.1",
"express-mongo-sanitize": "^2.2.0",
"helmet": "^8.0.0",
"morgan": "^1.10.0",
"nodemon": "^3.1.9"
```

---

## Middleware Details

### 1. Compression

**Version:** `^1.7.5`  
**Purpose:** Compresses HTTP responses to improve performance.

**Setup:**

```js
const compression = require('compression');
app.use(compression());
```

### 2. Cookie-Parser

**Version:** `^1.4.7`  
**Purpose:** Parses cookies attached to client requests.

**Setup:**

```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

### 3. CORS (Cross-Origin Resource Sharing)

**Version:** `^2.8.5`  
**Purpose:** Enables secure cross-origin requests.

**Setup:**

```js
const cors = require('cors');
app.use(cors());
```

### 4. Cross-Env

**Version:** `^7.0.3`  
**Purpose:** Allows setting environment variables across different platforms.

**Usage in `package.json`:**

```json
"scripts": {
  "start": "cross-env NODE_ENV=production node server.js"
}
```

### 5. Dotenv

**Version:** `^16.4.7`  
**Purpose:** Loads environment variables from a `.env` file.

**Setup:**

```js
require('dotenv').config();
```

### 6. Express-FileUpload

**Version:** `^1.5.1`  
**Purpose:** Enables file uploads in Express applications.

**Setup:**

```js
const fileUpload = require('express-fileupload');
app.use(fileUpload());
```

### 7. Express-Mongo-Sanitize

**Version:** `^2.2.0`  
**Purpose:** Prevents NoSQL injection attacks by sanitizing user inputs.

**Setup:**

```js
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());
```

### 8. Helmet

**Version:** `^8.0.0`  
**Purpose:** Provides security headers to protect against common web vulnerabilities.

**Setup:**

```js
const helmet = require('helmet');
app.use(helmet());
```

### 9. Morgan

**Version:** `^1.10.0`  
**Purpose:** Logs HTTP requests to the console.

**Setup:**

```js
const morgan = require('morgan');
app.use(morgan('combined'));
```

### 10. Nodemon

**Version:** `^3.1.9`  
**Purpose:** Automatically restarts the server during development when files change.

**Usage in `package.json`:**

```json
"scripts": {
  "dev": "nodemon server.js"
}
```

---
