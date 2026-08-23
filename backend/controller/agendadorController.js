const Agendador = require("../models/Agendador")
const slotsHorarios = require("../utils/horarios")
const { Op } = require("sequelize")

exports.listarGrade = async (req, res) => {
    try {
        const { data, laboratorio } = req.query

        if (!data || !laboratorio) {
            return res.status(400).json({ erro: "Campos 'data' e 'laboratorio' são obrigatórios na query string." })
        }

        if (laboratorio < 1 || laboratorio > 10) {
            return res.status(400).json({ erro: "O laboratório deve ser um número entre 1 e 10." })
        }

        const reservas = await Agendador.findAll({
            where: {
                laboratorio: Number(laboratorio),
                data: data
            }
        });

        const grade = slotsHorarios.map(slot => {
            const agendamento = reservas.find(r => 
                r.horarioInicio.startsWith(slot.inicio) && r.horarioFim.startsWith(slot.fim)
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
        console.error(error);
        res.status(500).json({ erro: "Erro ao consultar a grade de horários." });
    }
};

// Cadastrar um novo agendamento
exports.cadastrar = async (req, res) => {
    try {
        const { nomeUsuario, laboratorio, data, horarioInicial, horarioFinal, motivo } = req.body

        // 1. Validações básicas de entrada
        if (!nomeUsuario || !laboratorio || !data || !horarioInicial || !horarioFinal || !motivo) {
            return res.status(400).json({ erro: "Preencha todos os campos obrigatórios." })
        }

        if (laboratorio < 1 || laboratorio > 10) {
            return res.status(400).json({ erro: "Escolha um laboratório válido entre 1 e 10." })
        }

        // 2. Checa se o horário informado é um slot de 45 min válido
        const slotValido = slotsHorarios.some(s => s.inicio === horarioInicial && s.fim === horarioFinal)
        if (!slotValido) {
            return res.status(400).json({ erro: "O horário informado não coincide com os turnos permitidos de 45 minutos." })
        }

        // 3. Checa sobreposição de horários
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
            return res.status(400).json({ 
                erro: `O Laboratório ${laboratorio} já possui agendamento neste horário.` 
            });
        }

        // 4. Cria a reserva
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
        console.error(error)
        res.status(500).json({ erro: "Erro ao criar o agendamento." })
    }
};