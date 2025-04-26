const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const bcrypt = require('bcrypt'); // ✅ make sure this is imported!
require('dotenv').config();

module.exports = (app) => {
  // Init Passport
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const result = await db.query('SELECT id, first_name FROM users WHERE id = $1', [id]);
      if (result.rows.length) {
        done(null, result.rows[0]);
      } else {
        done(new Error('User not found'), null);
      }
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
      } catch (error) {
        return done(error);
      }
    }
  ));
};
