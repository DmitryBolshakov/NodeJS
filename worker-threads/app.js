const factorial = require("./factorial");

const compute = (array) => {
    const arr = [];
    for (let i = 0; i < 10000000; i++) {
        arr.push(i * i);
    }
    return array.map(el => factorial(el));

};

const main = () => {
    performance.mark('start');
    const result = [
        compute([25, 20, 30, 35, 48, 42]),
        compute([24, 25, 30, 35, 41, 50]),
        compute([25, 20, 30, 35, 48, 42]),
        compute([24, 25, 30, 35, 41, 50]),
    ];
    console.log(result);
    
    performance.mark('end');
    performance.measure('main', 'start', 'end'); 
    console.log(performance.getEntriesByName('main').pop());
};

main();