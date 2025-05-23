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
const pgSession = require('connect-pg-simple')(session);

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.SERVER_PORT || 3001;

// JSON & URL Encoded parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS must come BEFORE session and passport
const allowedOrigins = ['https://mariusmoraru.com'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Sessions
app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'None',
    maxAge: 3600000,
  },
}));

// Passport must come AFTER session
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

