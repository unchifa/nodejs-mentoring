import os from 'os';
import { argv } from 'yargs';
import { get, toString, chain } from 'lodash';

type ConsoleArgs = {
    fileName: string;
    exportFileName: string;
    ignoreColumns: string;
};

const BASE_PATH = './csv/';

const callOnce = (func: Function): Function => {
    let isFirstCall = true;

    return (data: string): string => {
        if (isFirstCall) {
            isFirstCall = false;

            return func(data);
        } else {
            return data;
        }
    };
};

export const firstLineToLower = callOnce((data: string): string => {
    const endOfFirstLine = data.indexOf(os.EOL);
    const firstLine = data.substring(0, endOfFirstLine).toLowerCase();

    return firstLine + data.substring(endOfFirstLine);
});

export const getConsoleArgs = (): ConsoleArgs => {
    const fileName = get(argv, '_.[0]');
    const exportFileName = get(argv, '_.[1]');
    const ignoreColumns = chain(argv)
        .get('ignoreColumns')
        .toString()
        .replace(',', '|')
        .valueOf();

    return {
        fileName: toString(fileName),
        exportFileName: toString(exportFileName),
        ignoreColumns: `(${ignoreColumns})`.toLowerCase(),
    };
};

export const createPath = (fileName: string): string => {
    return `${BASE_PATH}${fileName}`;
};
