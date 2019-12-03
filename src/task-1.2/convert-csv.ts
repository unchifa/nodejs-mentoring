import fs from 'fs';
import csv from 'csvtojson';
import through from 'through2';
import { pipeline } from 'stream';

import { firstLineToLower, getConsoleArgs, createPath } from './utils';
import { showErrorMessage, showMessage } from './helpers';

const SUCCESS_MESSAGE = 'CSV file converted successfully.';
const HELP = `
Usage:
npm run convert-csv file-to-convert.csv result-file.txt [--ignoreColumns column-name-1,column-name-2] 
`;

const prepareData = through((data, _encoding, callback) => {
    callback(null, Buffer.from(firstLineToLower(data.toString())));
});

const run = (): void => {
    try {
        const { fileName, exportFileName, ignoreColumns } = getConsoleArgs();
        if (!fileName || !exportFileName) {
            showMessage(HELP);
            return;
        }

        const readStream = fs.createReadStream(createPath(fileName));
        const writeStream = fs.createWriteStream(createPath(exportFileName));
        const csvOptions = { ignoreColumns: new RegExp(ignoreColumns, 'i') };
        const cvsConverter = csv(csvOptions);

        pipeline(readStream, prepareData, cvsConverter, writeStream, error => {
            if (error) {
                showErrorMessage(error);
            } else {
                showMessage(SUCCESS_MESSAGE);
            }
        });
    } catch (error) {
        showErrorMessage(error);
    }
};

run();
