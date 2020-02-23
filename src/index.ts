import express, { Application } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { config } from 'dotenv';
import { sequelize } from '../resources';
import { httpError, notFound } from './middlewares';
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
    .catch(e => console.log(e));
