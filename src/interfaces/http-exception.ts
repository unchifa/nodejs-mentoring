import { Boom } from '@hapi/boom';

export interface HttpException extends Boom {
    statusCode: number;
    message: string;
}
