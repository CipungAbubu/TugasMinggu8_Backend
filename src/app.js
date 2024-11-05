require('dotenv').config();

const express = require('express');
const routes = require('./routes/index');
const connectDB = require('./config/mongodb');
const testRoutes = require('./routes/test_routes'); 
const app = express();

const port = process.env.PORT; 

connectDB();

app.use(express.json());

app.use("/api/v1", routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

