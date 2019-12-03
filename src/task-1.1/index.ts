import process from 'process';

const ENCODING = 'utf8';
const EVENT = 'readable';

const reverseText = (text: string): string => {
    return text
        .split('')
        .reverse()
        .join('');
};
const writeLine = (text: string): void => {
    process.stdout.write(text + '\n');
};

process.stdin.setEncoding(ENCODING);
process.stdin.on(EVENT, () => {
    const input: string = process.stdin.read();
    if (input) {
        const output: string = reverseText(input);

        writeLine(output);
    }
});
