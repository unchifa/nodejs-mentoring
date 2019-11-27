import fs from 'fs';
import os from 'os';
import csv from 'csvtojson';
import through from 'through2';

const FILE_PATH = './csv/node_mentoring_t1_2_input_example.csv';
const EXPORT_FILE_PATH = './csv/export.txt';

const firstLineToUpper = (data: string): string => {
    const endOfFirstLine = data.indexOf(os.EOL);
    const firstLine = data.substring(0, endOfFirstLine).toLowerCase();

    return firstLine + data.substring(endOfFirstLine);
};

const prepareData = through((data, _encoding, callback) => {
    callback(null, new Buffer(firstLineToUpper(data.toString())));
});

try {
    const readStream = fs.createReadStream(FILE_PATH);
    const writeStream = fs.createWriteStream(EXPORT_FILE_PATH);
    const cvsConverter = csv();

    readStream
        .pipe(prepareData)
        .pipe(cvsConverter)
        .pipe(writeStream);
} catch (error) {
    console.error(error);
}
