import { Sequelize } from 'sequelize';

enum Dialect {
    POSTGRES = 'postgres'
}

const database = {
    name: 'smrpkhrr',
    password: 'r-U0dOONxp8tDbvUAZmyKQ1lr5VW0dH8',
    username: 'smrpkhrr',
    dialect: Dialect.POSTGRES,
    host: 'rogue.db.elephantsql.com',
    port: 5432
};

export const sequelize = new Sequelize(database.name, database.username, database.password, {
    dialect: database.dialect,
    host: database.host,
    port: database.port,
    define: { timestamps: false }
});
