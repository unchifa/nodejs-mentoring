import express, { Application } from 'express';
import Boom from '@hapi/boom';
import 'reflect-metadata';
import cors from 'cors';
import { config } from 'dotenv';
import { sequelize } from '../resources';
import { httpError, notFound } from './middlewares';
import { logger } from './utils/logger';
import { initializeUsers, initializeUserTable } from './modules/user';
import { initializeGroups, initializeGroupTable } from './modules/group';
import { initializeUsersGroupsTable } from './modules/user-group';

export const app: Application = express();

app.use(cors());
app.use(express.json());

config();
initializeUsers(app);
initializeGroups(app);

app.use('/', notFound);
app.use(httpError);

const { HOST, PORT } = process.env;

process
    .on('unhandledRejection', (reason, promise) => {
        logger.error(Boom.badImplementation(`Unhandled Rejection at: ${promise}, reason: ${reason}`));
        process.exit(1);
    })
    .on('uncaughtException', (error: Error) => {
        logger.error(Boom.badImplementation(`Uncaught Exception thrown - ${error}`));
        process.exit(1);
    });

sequelize
    .sync({ force: true })
    .then(initializeUserTable)
    .then(initializeGroupTable)
    .then(initializeUsersGroupsTable)
    .then(() => {
        app.listen(PORT, () => {
            // eslint-disable-next-line no-undef
            console.log(`Application running on http://${HOST}:${PORT}`);
        });
    })
    // eslint-disable-next-line no-undef
    .catch(e => logger.error(e));
