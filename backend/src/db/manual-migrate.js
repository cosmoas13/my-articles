require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('./index');

async function runManualMigration() {
  try {
    console.log('Running manual migration...');
    
    // Baca file SQL migrasi manual
    const migrationPath = path.join(process.cwd(), 'drizzle', '0002_manual_migration.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Jalankan migrasi dalam satu transaksi
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(migrationSQL);
      await client.query('COMMIT');
      console.log('Manual migration completed successfully!');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error during migration, rolling back:', error);
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runManualMigration();