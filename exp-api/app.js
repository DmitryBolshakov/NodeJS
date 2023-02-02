require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
 
app.use(morgan(process.env.LOG_LEVEL));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mongoSanitize());

fs.readdirSync('./routes').forEach(file => {
    let fileName = file.slice(0, -3);
    app.use('/' + fileName, require('./routes/' + fileName));
});

app.listen(port, () => {
    console.log('Server started on localhost:' + port);
});