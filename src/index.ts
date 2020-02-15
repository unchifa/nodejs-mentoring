import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config';
import { userRouter } from './modules/user';
import { sequelize } from './resources';
import { httpError } from './middlewares';

export const server: Application = express();

server.use(cors());
server.use(express.json());
server.use('/api', [userRouter]);
server.use(httpError());

sequelize
    .sync()
    .then(() => {
        server.listen(config.port, () => {
            console.log(`Application running on http://${config.host}:${config.port}`);
        });
    })
    .catch((e: any) => console.log(e));
