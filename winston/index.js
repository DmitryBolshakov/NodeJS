const express = require('express');
const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'server.log' })
    ]
});

const logFunc = function(req,res,next){
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${req.method} ${req.url} ${req.get("user-agent")}`;
    
    logger.log({
        level: 'info',
        message: data
    });    
    next();
};

const app = express();

app.use(logFunc);

app.get('/', function(req, res) {
    res.send('Hello from express');
});

app.listen(3000);