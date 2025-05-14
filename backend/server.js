const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = require('express').Router();

const User = require('./models/Users');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const upload = require('./middleware/upload');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB connected'))
  .catch(err => console.error("DB error in connecting", err));

app.listen(PORT, () => {
  console.log('Server running on port '+PORT);
});

// Routes
app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashingPassword = async (password) => {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        }   
        const newUser = new User({ username, email, password: await hashingPassword(password) });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

app.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });

        }  catch (error) {
        res.status(500).json({ message: 'Error sign in user', error });
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(403).send('A token is required for authentication');

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
}

app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        // const userId = req.user._id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

// Add Doctor
app.post('/api/createdoctor', async (req, res) => {
    try {
        const { firstname, lastname, specialization, department } = req.body;
        const newDoctor = new Doctor({ firstname, lastname, specialization, department });
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor created successfully', doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Error creating doctor', error });
    }
});

// Get all dococts
app.get('/api/doctor', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error });
    }
});

// Get a doctor by ID
app.get('/api/doctor/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctor', error });
    }
});

// Update a doctor
app.put('/api/doctor/:id', async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDoctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json({ message: 'Doctor updated successfully', doctor: updatedDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Error updating doctor', error });
    }
});

// Delete a doctor
app.delete('/api/doctor/:id', async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting doctor', error });
  }
});

// Add Patient
app.post('/api/createpatient', upload.fields([{ name: 'image' }, { name: 'document' }]), async (req, res) => {
  console.log("Request received at /createpatient");
  try {
    const { firstname, lastname, email, address, date_of_birth, doctorId } = req.body;
    console.log("Body:", req.body); // Log body for debugging

    // Check if doctorId is provided
    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    // Check if doctorId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctor ID" });
    }

    // Get the file paths (if files were uploaded)
    const image = req.files?.image ? req.files.image[0].filename : null;
    const document = req.files?.document ? req.files.document[0].filename : null;

    const newPatient = new Patient({
      firstname,
      lastname,
      email,
      address,
      date_of_birth,
      doctor: doctorId,
      image,
      document
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient created successfully' });
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all patients
app.get('/api/patient', async (req, res) => {
  try {
    const patients = await Patient.find().populate('doctor', 'firstname lastname');
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
});

// Get a patient by ID
app.get('/api/patient/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient', error });
}
});

// Update a patient
app.put('/api/patient/:id', upload.fields([{ name: 'image' }, { name: 'document' }]), async (req, res) => {
  console.log("Request received at /updatepatient");
  try {
    const { id } = req.params;
    const { firstname, lastname, email, address, date_of_birth, doctorId } = req.body;

    // Validate ID and doctorId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }

    if (!doctorId || !mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: 'Invalid doctor ID' });
    }

    // Find existing patient
    const existingPatient = await Patient.findById(id);
    if (!existingPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Update fields
    existingPatient.firstname = firstname;
    existingPatient.lastname = lastname;
    existingPatient.email = email;
    existingPatient.address = address;
    existingPatient.date_of_birth = date_of_birth;
    existingPatient.doctor = doctorId;

    // Update files if new ones were uploaded
    if (req.files?.image) {
      existingPatient.image = req.files.image[0].filename;
    }

    if (req.files?.document) {
      existingPatient.document = req.files.document[0].filename;
    }

    await existingPatient.save();
    res.status(200).json({ message: 'Patient updated successfully' });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a patient
app.delete('/api/patient/:id', async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) return res.status(404).json({ message: 'Patient not found' });
        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting patient', error });
    }
});
