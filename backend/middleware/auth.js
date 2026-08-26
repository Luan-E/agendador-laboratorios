const jwt = require("jsonwebtoken");
const { AppError } = require("../middleware/errorHandler");

const JWT_SECRET = process.env.JWT_SECRET;

const autenticar = (req, res, next) => {
    if (!JWT_SECRET) {
        throw new AppError("JWT_SECRET não configurado no servidor.", 500);
    }

    let token = null;

    const headerAuth = req.headers.authorization;
    if (headerAuth && headerAuth.startsWith("Bearer ")) {
        token = headerAuth.split(" ")[1];
    }

    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        throw new AppError("Token de autenticação não fornecido.", 401);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        throw new AppError("Token de autenticação inválido ou expirado.", 401);
    }
};

module.exports = autenticar;
