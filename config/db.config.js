const env = require("dotenv")

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: "bookstore_db",
    dialect: "mysql"
  };
  