const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { AppError } = require("../middleware/errorHandler");

const JWT_SECRET = process.env.JWT_SECRET;

const tentativasLogin = {};

function registrarTentativa(email) {
    if (!tentativasLogin[email]) {
        tentativasLogin[email] = { count: 0, until: Date.now() + 15 * 60 * 1000 };
    }
    const tentativa = tentativasLogin[email];
    if (Date.now() > tentativa.until) {
        tentativa.count = 0;
        tentativa.until = Date.now() + 15 * 60 * 1000;
    }
    tentativa.count++;
}

function estaBloqueado(email) {
    const tentativa = tentativasLogin[email];
    if (!tentativa) return false;
    if (Date.now() > tentativa.until) {
        tentativa.count = 0;
        return false;
    }
    return tentativa.count >= 5;
}

function limparTentativas(email) {
    delete tentativasLogin[email];
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function criarToken(usuario) {
    if (!JWT_SECRET) {
        throw new AppError("JWT_SECRET não configurado no servidor.", 500);
    }
    return jwt.sign(
        { id: usuario.id, nome: usuario.nome, email: usuario.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
}

function enviarTokenCookie(res, token) {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
    });
}

exports.cadastrar = async (req, res, next) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            throw new AppError("Preencha todos os campos obrigatórios.", 400);
        }

        if (!validarEmail(email)) {
            throw new AppError("Formato de e-mail inválido.", 400);
        }

        if (senha.length < 6) {
            throw new AppError("A senha deve ter pelo menos 6 caracteres.", 400);
        }

        const usuarioExistente = await User.findOne({ where: { email } });
        if (usuarioExistente) {
            throw new AppError("Este e-mail já está cadastrado.", 400);
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = await User.create({
            nome,
            email,
            senha: senhaHash
        });

        const token = criarToken(novoUsuario);
        enviarTokenCookie(res, token);

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso.",
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            throw new AppError("Preencha todos os campos obrigatórios.", 400);
        }

        if (estaBloqueado(email)) {
            throw new AppError("Conta temporariamente bloqueada. Tente novamente em 15 minutos.", 429);
        }

        const usuario = await User.findOne({ where: { email } });
        if (!usuario) {
            registrarTentativa(email);
            throw new AppError("E-mail ou senha inválidos.", 401);
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            registrarTentativa(email);
            throw new AppError("E-mail ou senha inválidos.", 401);
        }

        limparTentativas(email);

        const token = criarToken(usuario);
        enviarTokenCookie(res, token);

        res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0
    });
    res.status(200).json({ mensagem: "Logout realizado com sucesso." });
};

exports.verificarToken = async (req, res, next) => {
    try {
        const { id } = req.usuario;

        const usuario = await User.findByPk(id, {
            attributes: ["id", "nome", "email"]
        });

        if (!usuario) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        res.status(200).json({ usuario });

    } catch (error) {
        next(error);
    }
};
