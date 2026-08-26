const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { erro: "Muitas tentativas de login. Tente novamente em 15 minutos." },
    standardHeaders: true,
    legacyHeaders: false,
});

const cadastroLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: { erro: "Muitas tentativas de cadastro. Tente novamente em 15 minutos." },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { loginLimiter, cadastroLimiter };
