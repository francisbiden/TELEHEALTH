const express = require('express');
const router = express.Router();
const authController = require('./authController');
const db = require ('./config/db.js')
const bcrypt = require('bcryptjs')


router.post('/register-Patient', authController.registerPatient);
router.get('/get-patient', authController.getPatient);
router.post('/update-patient', authController.updatepatient);
router.get('/delete-Patient', authController.deletePatient);


router.post('/register-Doctor', authController.registerDoctor);
router.get('/get-Doctors', authController.getDoctors);
router.post('/update-patient', authController.updatepatient);
router.get('/deleteDoctor', authController.deleteDoctor);


router.post('/book-Appointment', authController.bookAppointment);
router.get('/get-Appointment', authController.getAppointment);
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/logout', authController.logout);

/*
// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query to find the user
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Server error');
        }

        // Check if user exists
        if (results.length > 0) {
            const user = results[0];

            // Compare the input password with the stored hash
            const passwordMatch = await bcrypt.compare(password, user.password_hash);
            if (passwordMatch) {
                res.send('Login successful');
                // Set up session handling or token generation here
            } else {
                res.status(401).send('Invalid email or password');
            }
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
});
*/



module.exports = router;




