
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const Patient = {
    create: async (data) => {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the salt rounds

        const query = `
            INSERT INTO patients (name, email, password_hash, phone_number)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [
            data.name,
            data.email,
            hashedPassword, // Use the hashed password
            data.phone_number
        ]);
        return result;
    },

    update: async (id, data) => {
        // Hash the password before updating it
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const query = `
            UPDATE patients
            SET name = ?, email = ?, password_hash = ?
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [
            data.name,
            data.email,
            hashedPassword, // Use the hashed password
            id
        ]);
        return result;
    },

    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM patients');
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM patients WHERE id = ?', [id]);
        return rows[0];
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM patients WHERE id = ?', [id]);
        return result;
    }
    // Other methods remain the same
};

module.exports = Patient;


