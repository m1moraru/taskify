const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); 
const { Pool } = require('pg');

// Debugging check
console.log('Database password:', process.env.DB_PASSWORD);

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

// Only run connection test if this file is executed directly
if (require.main === module) {
  (async () => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT NOW()');
      console.log('✅ Database connected:', result.rows[0]);
      client.release();
    } catch (err) {
      console.error('Error connecting to database:', err.message);
    }
  })();
}

module.exports = pool;
