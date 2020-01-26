import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { userRouter } from './users';

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());
server.use('/api', [userRouter]);

server.listen(4004, () => {
    console.log('API is available here: http://localhost:4004/api/users');
});
