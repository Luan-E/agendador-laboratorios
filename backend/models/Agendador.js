const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Agendador = sequelize.define("Agendador", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    laboratorio: {
        type: DataTypes.INTEGER(11, 10),
        allowNull: false
    },
    reserva: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

module.exports = Agendador