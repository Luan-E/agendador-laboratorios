require("dotenv").config()

const app = require("./app")
const sequelize = require("./config/database")

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log("Banco conectado com sucesso.")
        app.listen(PORT, () => {
            console.log(`Rodando na porta ${PORT}`)
        });
    })
    .catch((error) => console.log("Erro ao conectar ao banco:", error));