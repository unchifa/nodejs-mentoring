import express, { Application } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { sequelize } from '../resources';
import { config } from './config';
import { httpError, notFound } from './middlewares';
import { initializeUsers, initializeUserTable } from './modules/user';
import { initializeGroups, initializeGroupTable } from './modules/group';
import { initializeUsersGroupsTable } from './modules/user-group';

export const app: Application = express();

app.use(cors());
app.use(express.json());

initializeUsers(app);
initializeGroups(app);

app.use('/', notFound);
app.use(httpError);

sequelize
    .sync({ force: true })
    .then(initializeUserTable)
    .then(initializeGroupTable)
    .then(initializeUsersGroupsTable)
    .then(() => {
        app.listen(config.port, () => {
            // eslint-disable-next-line no-undef
            console.log(`Application running on http://${config.host}:${config.port}`);
        });
    })
    // eslint-disable-next-line no-undef
    .catch(e => console.log(e));
