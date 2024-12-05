const db = require('../config/db');

const Appointments = {
    create: async (data) => {
        const query = `
            INSERT INTO appointments ( patient_id,doctor_id,appointment_date,appointment_time)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [
            data.patient_id || null,
            data.doctor_id ,
            data.appointment_date ,
            data.appointment_time 
            
        ]);
        return result;
    },

    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM appointments');
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM apppointments WHERE id = ?', [id]);
        return rows[0];
    },

    update: async (id, data) => {
        const query = `
            UPDATE appointments
            SET selectDoctor = ?,  appointment_date = ?, appointment_time = ?
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [
            data.selectDoctor,
            data.appointment_date,
            data.appointment_time,
            id
        ]);
        return result;
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM appointments WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Appointments;
