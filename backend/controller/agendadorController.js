const Agendador = require("../models/Agendador")
const slotsHorarios = require("../utils/horarios")
const { Op } = require("sequelize")
const { AppError } = require("../middleware/errorHandler")

exports.listarGrade = async (req, res, next) => {
    try {
        const { data, laboratorio } = req.query

        if (!data || !laboratorio) {
            throw new AppError("Campos 'data' e 'laboratorio' são obrigatórios na query string.", 400)
        }

        if (laboratorio < 1 || laboratorio > 10) {
            throw new AppError("O laboratório deve ser um número entre 1 e 10.", 400)
        }

        const reservas = await Agendador.findAll({
            where: {
                laboratorio: Number(laboratorio),
                data: data
            }
        });

        const grade = slotsHorarios.map(slot => {
            const agendamento = reservas.find(r =>
                r.horarioInicial.startsWith(slot.inicio) && r.horarioFinal.startsWith(slot.fim)
            );

            return {
                inicio: slot.inicio,
                fim: slot.fim,
                turno: slot.turno,
                reservado: !!agendamento,
                usuario: agendamento ? agendamento.nomeUsuario : null,
                idAgendamento: agendamento ? agendamento.id : null
            };
        });

        res.status(200).json({
            laboratorio: Number(laboratorio),
            data,
            grade
        });

    } catch (error) {
        next(error)
    }
};

exports.cadastrar = async (req, res, next) => {
    try {
        const { nomeUsuario, laboratorio, data, horarioInicial, horarioFinal, motivo } = req.body

        if (!nomeUsuario || !laboratorio || !data || !horarioInicial || !horarioFinal || !motivo) {
            throw new AppError("Preencha todos os campos obrigatórios.", 400)
        }

        if (laboratorio < 1 || laboratorio > 10) {
            throw new AppError("Escolha um laboratório válido entre 1 e 10.", 400)
        }

        const slotValido = slotsHorarios.some(s => s.inicio === horarioInicial && s.fim === horarioFinal)
        if (!slotValido) {
            throw new AppError("O horário informado não coincide com os turnos permitidos de 45 minutos.", 400)
        }

        const conflito = await Agendador.findOne({
            where: {
                laboratorio: laboratorio,
                data: data,
                [Op.and]: [
                    { horarioInicial: { [Op.lt]: horarioFinal } },
                    { horarioFinal: { [Op.gt]: horarioInicial } }
                ]
            }
        });

        if (conflito) {
            throw new AppError(`O Laboratório ${laboratorio} já possui agendamento neste horário.`, 400)
        }

        const novoAgendamento = await Agendador.create({
            nomeUsuario,
            laboratorio,
            data,
            horarioInicial,
            horarioFinal,
            motivo
        });

        res.status(201).json(novoAgendamento);

    } catch (error) {
        next(error)
    }
};

exports.cancelar = async (req, res, next) => {
    try {
        const { id } = req.params

        const agendamento = await Agendador.findByPk(id)
        if (!agendamento) {
            throw new AppError("Agendamento não encontrado.", 404)
        }

        await agendamento.destroy()

        res.status(200).json({ mensagem: "Agendamento cancelado com sucesso." })

    } catch (error) {
        next(error)
    }
};

exports.editar = async (req, res, next) => {
    try {
        const { id } = req.params
        const { nomeUsuario, laboratorio, data, horarioInicial, horarioFinal, motivo } = req.body

        const agendamento = await Agendador.findByPk(id)
        if (!agendamento) {
            throw new AppError("Agendamento não encontrado.", 404)
        }

        if (!nomeUsuario || !laboratorio || !data || !horarioInicial || !horarioFinal || !motivo) {
            throw new AppError("Preencha todos os campos obrigatórios.", 400)
        }

        if (laboratorio < 1 || laboratorio > 10) {
            throw new AppError("Escolha um laboratório válido entre 1 e 10.", 400)
        }

        const slotValido = slotsHorarios.some(s => s.inicio === horarioInicial && s.fim === horarioFinal)
        if (!slotValido) {
            throw new AppError("O horário informado não coincide com os turnos permitidos de 45 minutos.", 400)
        }

        const conflito = await Agendador.findOne({
            where: {
                laboratorio: laboratorio,
                data: data,
                id: { [Op.ne]: id },
                [Op.and]: [
                    { horarioInicial: { [Op.lt]: horarioFinal } },
                    { horarioFinal: { [Op.gt]: horarioInicial } }
                ]
            }
        });

        if (conflito) {
            throw new AppError(`O Laboratório ${laboratorio} já possui agendamento neste horário.`, 400)
        }

        await agendamento.update({
            nomeUsuario,
            laboratorio,
            data,
            horarioInicial,
            horarioFinal,
            motivo
        });

        res.status(200).json(agendamento)

    } catch (error) {
        next(error)
    }
};

exports.listarPorUsuario = async (req, res, next) => {
    try {
        const { nomeUsuario } = req.query

        if (!nomeUsuario) {
            throw new AppError("O campo 'nomeUsuario' é obrigatório na query string.", 400)
        }

        const agendamentos = await Agendador.findAll({
            where: { nomeUsuario },
            order: [["data", "ASC"], ["horarioInicial", "ASC"]]
        });

        res.status(200).json(agendamentos)

    } catch (error) {
        next(error)
    }
};
