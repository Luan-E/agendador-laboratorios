const express = require("express")

const router = express.Router()

const agendadorController = require("../controller/agendadorController")

router.post("/agendador", agendadorController.cadastrar)

router.get("/agendador", agendadorController.listar)


module.exports = router