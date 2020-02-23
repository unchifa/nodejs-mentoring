import { createLogger, format, transports } from 'winston';
import { TransformableInfo } from 'logform';

const formatter = format.printf(({ level, message, timestamp }: TransformableInfo) => {
    return `${timestamp} [${level}]: ${message}`;
});

const { combine, timestamp, colorize } = format;

export const logger = createLogger({
    exitOnError: false,
    format: combine(timestamp(), formatter),
    transports: [
        new transports.Console({ format: combine(colorize(), timestamp(), formatter) }),
        new transports.File({ filename: 'logs/errors.log', level: 'error' }),
        new transports.File({ filename: 'logs/warnings.log', level: 'warn' }),
        new transports.File({ filename: 'logs/info.log', level: 'info' })
    ]
});