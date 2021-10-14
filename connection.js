const { Sequelize } = require("sequelize");

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false //can be used to remove the SQL noise from the terminal
});
exports.connection = connection;
