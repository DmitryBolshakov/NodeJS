const factorial = require("./factorial");
const { Worker } = require('worker_threads');
//const { resolve } = require("path");

const compute = (array) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {workerData: {array}});   

        worker.on('message', (msg) => {
            console.log(worker.threadId);
            resolve(msg);
        });

        worker.on('error', (err) => {
            reject(err);
        });

        worker.on('exit', () => {
            console.log('Завершил работу');
        });
    });    
};

const main = async () => {
    try {
        performance.mark('start');
        const result = await Promise.all([
        compute([25, 20, 30, 35, 48, 42]),
        compute([24, 25, 30, 35, 41, 50]),
        compute([25, 20, 30, 35, 48, 42]),
        compute([24, 25, 30, 35, 41, 50]),
        ]);
         console.log(result);    
        performance.mark('end');
        performance.measure('main', 'start', 'end'); 
        console.log(performance.getEntriesByName('main').pop());
    } catch(e) {
        console.log(e.message);
    }
    
};

main();