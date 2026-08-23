require("dotenv").config()

const app = require("./app")

const sequelize = require("./config/database")

const PORT = 3000

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Rodando na porta 3000")
        })
    })