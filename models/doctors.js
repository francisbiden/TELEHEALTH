const db = require('../config/db');

const Doctor = {
    create: async (data) => {
        const query = `
            INSERT INTO doctors (name, email, specialization, schedule)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [
            data.name,
            data.email,
            data.specializaton,
            data.schedule
            
        ]);
        return result;
    },

    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM doctors');
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM doctors WHERE id = ?', [id]);
        return rows[0];
    },

    update: async (id, data) => {
        const query = `
            UPDATE doctors
            SET name = ?, email = ?, specialization = ?, schedule = ?
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [
            data.name,
            data.email,
            data.specializaton,
            data.schedule,
            id
        ]);
        return result;
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM doctors WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Doctor;
