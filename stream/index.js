const http = require('http');
const fs = require('fs');
const { stdout } = require('process');
const { error } = require('console');

new http.Server((req, res) => {
    if (req.url == '/big.html') {
        const file = new fs.ReadStream('big.html');
        sendFile(file, res);
    }
}).listen(3000);

function sendFile(file, res) {
    file.pipe(res);
    file.pipe(stdout);

    file.on('error', () => {
        res.statusCode = 500;
        res.end('Server Error');
        console.error(error);
    });

    res.on('close', () => {
        file.destroy();
    });
}