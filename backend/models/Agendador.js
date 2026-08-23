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
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1,
        max: 10,
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horarioInicial: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horarioFinal: {
        type: DataTypes.TIME,
        allowNull: false
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Agendador