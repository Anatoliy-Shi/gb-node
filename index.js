const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./access_tmp.log', 'utf-8');
const writeStreamFirst = fs.createWriteStream('./89.123.1.41_requests.log');
const writeStreamSecond = fs.createWriteStream('./34.48.240.111_requests.log');

const readLine = readline.createInterface({
    input: readStream,
    terminal: true,
})

readLine.on('line', line => {
    if (line.includes('89.123.1.41')) {
        writeStreamFirst.write(line + '\n');
    }

    if (line.includes('34.48.240.111')) {
        writeStreamSecond.write(line + '\n');
    }
})

writeStreamFirst.end(() => console.log('Writing to file 89.123.1.41_requests.log is completed'));
writeStreamSecond.end(() => console.log('Writing to file 34.48.240.111_requests.log is completed'));