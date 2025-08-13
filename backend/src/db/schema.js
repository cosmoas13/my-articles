// Import all schemas from their respective files
const { users, refreshTokens } = require('./schema/users.schema');
const { categories, tags, articles, articleTags } = require('./schema/article.schema');
const { comments } = require('./schema/comment.schema');

module.exports = {
  users,
  refreshTokens,
  categories,
  tags,
  articles,
  articleTags,
  comments
};