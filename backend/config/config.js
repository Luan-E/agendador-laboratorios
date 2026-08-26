require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "890iop",
    database: process.env.DB_NAME || "agendadorLaboratorios",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "890iop",
    database: process.env.DB_NAME || "agendadorLaboratorios",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "890iop",
    database: process.env.DB_NAME || "agendadorLaboratorios",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  }
};
