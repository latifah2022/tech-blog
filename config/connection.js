const Sequelize = require("sequire");
require("dotenv").config();

if (Process.env.JAWSDB_URL) {
    Sequelize = new Sequelize(Process.env.JAWSDB_URL);
} else {
    Sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    )
}

module.exports = sequelize;