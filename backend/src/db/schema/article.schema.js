const { pgTable, uuid, varchar, text, timestamp, boolean } = require('drizzle-orm/pg-core');
const { randomUUID } = require('crypto');
// Avoid circular dependency by importing directly from users schema
const { users } = require('./users.schema');

// Categories table schema
const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tags table schema
const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Articles table schema
const articles = pgTable('articles', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  categoryId: uuid('category_id').references(() => categories.id),
  authorId: uuid('author_id').references(() => users.id).notNull(),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Article-Tag relation (many-to-many)
const articleTags = pgTable('article_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  articleId: uuid('article_id').references(() => articles.id).notNull(),
  tagId: uuid('tag_id').references(() => tags.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

module.exports = {
  categories,
  tags,
  articles,
  articleTags,
};