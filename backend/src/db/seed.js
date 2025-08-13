require('dotenv').config();
const { db, pool } = require('./index');
const { categories } = require('./schema');

async function seedCategories() {
  try {
    console.log('Seeding categories...');
    
    // Check if categories already exist
    const existingCategories = await db.select().from(categories);
    
    if (existingCategories.length > 0) {
      console.log('Categories already seeded. Skipping...');
      return;
    }
    
    // Predefined categories
    const categoryData = [
      { name: 'Technology', description: 'Articles about technology, programming, and software development' },
      { name: 'Health', description: 'Articles about health, wellness, and fitness' },
      { name: 'Business', description: 'Articles about business, entrepreneurship, and finance' },
      { name: 'Education', description: 'Articles about education, learning, and personal development' },
      { name: 'Entertainment', description: 'Articles about entertainment, movies, music, and culture' },
      { name: 'Science', description: 'Articles about science, research, and discoveries' },
      { name: 'Travel', description: 'Articles about travel, destinations, and adventures' },
      { name: 'Food', description: 'Articles about food, cooking, recipes, and culinary experiences' },
      { name: 'Sports', description: 'Articles about sports, athletics, and outdoor activities' },
      { name: 'Lifestyle', description: 'Articles about lifestyle, fashion, and home' }
    ];
    
    // Insert categories
    await db.insert(categories).values(categoryData);
    
    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
}

async function seed() {
  try {
    await seedCategories();
    console.log('All seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the database connection
    await pool.end();
  }
}

// Run the seed function
seed();