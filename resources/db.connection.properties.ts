import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_DIALECT, DB_HOST, DB_PORT }: any = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    dialect: DB_DIALECT,
    host: DB_HOST,
    port: DB_PORT,
    define: { timestamps: false }
});
