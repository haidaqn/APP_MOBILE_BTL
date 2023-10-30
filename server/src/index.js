const express = require('express');
require('dotenv').config();
const initRoutes = require('./router/index');
const db = require('./config/db/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Define an array of allowed origins
const allowedOrigins = [
    'http://192.168.247.1:3000',
    'http://localhost:8081',
    'http://localhost:8082',
    'http://localhost:19006',
    'exp://172.16.6.42:8081',
    'http://127.0.0.1:5173'
];

const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['POST', 'GET', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));

// Connect to the database
db.connect()
    .then(() => {
        console.log('Database connected successfully');
        // Define your API routes
        initRoutes(app);

        const port = process.env.PORT || 8081;

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
