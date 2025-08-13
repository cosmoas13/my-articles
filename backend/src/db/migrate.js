require('dotenv').config();
const { migrate } = require('drizzle-orm/node-postgres/migrator');
const { db, pool } = require('./index');

// Run migrations
const runMigrations = async () => {
  console.log('Running migrations...');
  
  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
};

runMigrations();