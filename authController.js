const bcrypt = require('bcryptjs');
const db = require('./config/db');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        req.session.userId = user[0].id;
        req.session.role = user[0].role; // Optional: Use for role-based access
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};


// Signup function
exports.signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the user data into the database
        const query = 'INSERT INTO users (email, password_hash) VALUES (?, ?)';
        db.query(query, [email, hashedPassword], (error, results) => {
            if (error) {
                console.error('Error inserting user data:', error);
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send('Email already exists');
                }
                return res.status(500).send('Server error');
            }

            // Create session data (for example, a simple object or session setup)
            req.session.userId = results.insertId;
            res.status(201).send('Signup successful');
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Error during signup');
    }
};



exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

//patient
const Patient = require('./models/patients');

exports.registerPatient = async (req, res) => {
    try {
 
  
        const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // Pass the plain-text password
    phone_number: req.body.phone_number
            
        };
        const result = await Patient.create(data);
        res.status(201).json({ message: 'Patient registered successfully', patientId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering patient' });
    }
};

exports.getPatient = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving patients' });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const candidate = await Patient.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ message: 'patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving patient' });
    }
};

exports.updatepatient = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        

        };
        const result = await Patient.update(req.params.id, data);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating patient' });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const result = await Patient.delete(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting patient' });
    }
};



//Doctor
const Doctor = require('./models/doctors');

exports.registerDoctor = async (req, res) => {
    try {
        const data = {
            name: req.body.name || null,
            email: req.body.email || null,
            specializaton: req.body.specializaton || null,
            schedule: req.body.schedule || null
        };
        const result = await Doctor.create(data);
        res.status(201).json({ message: 'Doctor registered successfully', doctorId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering doctor',error });
    }
};

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving doctors' });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving doctor' });
    }
};

exports.updatepatient = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            specializaton: req.body.specializaton,
            schedule: req.body.schedule
        

        };
        const result = await Doctor.update(req.params.id, data);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'doctor updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating doctor' });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const result = await Doctor.delete(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting doctor' });
    }
};



//appointments
const Appointments = require('./models/appointments');

exports.bookAppointment = async (req, res) => {
    try {
        const data = {
            patient_id: req.body.patient_id || null,
            doctor_id: req.body.doctor_id || null,
            appointment_date: req.body.appointment_date || null,
            appointment_time: req.body.appointment_time || null,
           
        };
        const result = await Appointments.create(data);
        res.status(201).json({ message: 'Appointment booked successfully', appointmentId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error booking appointment', error });
    }
};

exports.getAppointment= async (req, res) => {
    try {
        const appointments = await Appointments.findAll();
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving appointments' });
    }
};




