const Agendador = require("../models/Agendador")

exports.cadastrar = async(req, res) => {
    try {
        const agendador = await Agendador.create({
            nomeUsuario: req.body.nomeUsuario,
            laboratorio: 1,
            reserva: true
        })

        res.status(201).json(agendador)

    } catch(error) {
        console.log(error)
        res.status(500).json({ erro: "Erro ao cadastrar agendamento" })
    }
}

exports.listar = async(req, res) => {
    try {
        const agendador = await Agendador.findAll()

        res.status(200).json(agendador)

    } catch(error) {
        console.log(error)
        res.status(500).json({ erro: "Erro ao listar agendamentos" })
    }
}