const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const autenticar = require("../middleware/auth");
const { loginLimiter, cadastroLimiter } = require("../middleware/rateLimiter");

router.post("/auth/cadastrar", cadastroLimiter, authController.cadastrar);
router.post("/auth/login", loginLimiter, authController.login);
router.post("/auth/logout", autenticar, authController.logout);
router.get("/auth/verificar", autenticar, authController.verificarToken);

module.exports = router;
