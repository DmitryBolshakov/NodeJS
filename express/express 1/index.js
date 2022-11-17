const express = require('express');
const fs = require('fs');

const log = function(req,res,next){
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${req.method} ${req.url} ${req.get("user-agent")}`;
    console.log(data);
    fs.appendFile('server.log', data + '/n', function(){});
        next();
};

const app = express();

app.use(log);

app.get('/', function(req, res) {
    res.send('Hello from express');
});

app.listen(3000);