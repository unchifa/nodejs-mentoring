import process from 'process';

const ENCODING = 'utf8';
const EVENT = 'readable';

function reverseText(text: string): string {
    return text
        .split('')
        .reverse()
        .join('');
}

process.stdin.setEncoding(ENCODING);
process.stdin.on(EVENT, () => {
    const input: string = process.stdin.read();
    const output: string = reverseText(input);

    if (input) {
        console.log(output);
    }
});
