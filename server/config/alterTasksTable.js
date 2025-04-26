require('dotenv').config({ path: '../.env' });
const pool = require('./db');

(async () => {
  try {
    console.log('Connecting to the database...');

    const alterTasksTableStmt = `
      ALTER TABLE tasks
      ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE;
    `;

    await pool.query(alterTasksTableStmt);
    console.log('✅ Archived column added to tasks table (if not exists).');

  } catch (err) {
    console.error('Error altering the database:', err.message);
  } finally {
    await pool.end();
    console.log('Database connection pool closed.');
  }
})();
