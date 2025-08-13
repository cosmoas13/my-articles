const { pgTable, uuid, varchar, text, timestamp, boolean } = require('drizzle-orm/pg-core');
const { randomUUID } = require('crypto');
const { articles } = require('./article.schema');

// Comments table schema
const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  articleId: uuid('article_id').references(() => articles.id).notNull(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }),
  isAnonymous: boolean('is_anonymous').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

module.exports = {
  comments,
};