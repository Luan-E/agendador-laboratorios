const slotsHorarios = [
// Turno Matutino (07:30 - 12:15)
    { inicio: "07:30", fim: "08:15", turno: "matutino" },
    { inicio: "08:15", fim: "09:00", turno: "matutino" },
    { inicio: "09:00", fim: "09:45", turno: "matutino" },
    { inicio: "09:45", fim: "10:30", turno: "matutino" },
    { inicio: "10:30", fim: "11:15", turno: "matutino" },
    { inicio: "11:15", fim: "12:00", turno: "matutino" },

    // Turno Vespertino (13:30 - 18:15)
    { inicio: "13:30", fim: "14:15", turno: "vespertino" },
    { inicio: "14:15", fim: "15:00", turno: "vespertino" },
    { inicio: "15:00", fim: "15:45", turno: "vespertino" },
    { inicio: "15:45", fim: "16:30", turno: "vespertino" },
    { inicio: "16:30", fim: "17:15", turno: "vespertino" },
    { inicio: "17:15", fim: "18:00", turno: "vespertino" },

    // Turno Noturno (19:00 - 22:00)
    { inicio: "19:00", fim: "19:45", turno: "noturno" },
    { inicio: "19:45", fim: "20:30", turno: "noturno" },
    { inicio: "20:30", fim: "21:15", turno: "noturno" },
    { inicio: "21:15", fim: "22:00", turno: "noturno" }
];

module.exports = slotsHorarios