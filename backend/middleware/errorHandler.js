class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Erro interno do servidor.";

    console.error(`[ERRO ${statusCode}] ${message}`);

    if (process.env.NODE_ENV !== "production") {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        erro: message,
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
    });
};

module.exports = { AppError, errorHandler };
