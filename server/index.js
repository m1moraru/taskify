require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const passportConfig = require('./config/passportConfig');
const pool = require('./config/db');
const userRoutes = require('./routes/usersRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// CORS setup
app.use(cors({
  origin: 'https://mariusmoraru.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// JSON & URL Encoded parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 3600000, // 1 hour
  },
}));

// Initialize passport
passportConfig(app); 
app.use(passport.initialize());
app.use(passport.session());

// Connect to DB
pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
