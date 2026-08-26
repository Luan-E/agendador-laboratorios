const express = require("express")
const router = express.Router()
const agendadorController = require("../controller/agendadorController")
const autenticar = require("../middleware/auth")

router.get("/agendador/grade", agendadorController.listarGrade)
router.get("/agendador/meus", autenticar, agendadorController.listarPorUsuario)
router.post("/agendador", autenticar, agendadorController.cadastrar)
router.put("/agendador/:id", autenticar, agendadorController.editar)
router.delete("/agendador/:id", autenticar, agendadorController.cancelar)

module.exports = router
