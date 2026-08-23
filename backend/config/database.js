const { Sequelize } = require("sequelize")

require("dotenv").config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:"mysql"
    }
);

sequelize.authenticate()
    .then(() => console.log("Banco conectado com sucesso"))
    .catch(error => console.log(error))

module.exports = sequelize