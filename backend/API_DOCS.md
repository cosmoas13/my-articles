# API Documentation

## Authentication Endpoints

### Register
```
POST /api/auth/register
```
Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Login
```
POST /api/auth/login
```
Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Refresh Token
```
POST /api/auth/refresh-token
```
Request Body:
```json
{
  "refreshToken": "your-refresh-token"
}
```

### Logout
```
POST /api/auth/logout
```
Requires Authentication: Yes (Bearer Token)

### Get Profile
```
GET /api/auth/profile
```
Requires Authentication: Yes (Bearer Token)

## Category Endpoints

### Get All Categories
```
GET /api/categories
```

### Get Category by ID
```
GET /api/categories/:id
```

### Create Category
```
POST /api/categories
```
Requires Authentication: Yes (Bearer Token)

Request Body:
```json
{
  "name": "Technology",
  "description": "Articles about technology and programming"
}
```

### Update Category
```
PUT /api/categories/:id
```
Requires Authentication: Yes (Bearer Token)

Request Body:
```json
{
  "name": "Updated Technology",
  "description": "Updated description"
}
```

### Delete Category
```
DELETE /api/categories/:id
```
Requires Authentication: Yes (Bearer Token)

## Tag Endpoints

### Get All Tags
```
GET /api/tags
```

### Get Tag by ID
```
GET /api/tags/:id
```

### Create Tag
```
POST /api/tags
```
Requires Authentication: Yes (Bearer Token)

Request Body:
```json
{
  "name": "JavaScript"
}
```

### Create Multiple Tags
```
POST /api/tags/batch
```
Requires Authentication: Yes (Bearer Token)

Request Body:
```json
{
  "tags": ["JavaScript", "React", "Node.js"]
}
```

### Delete Tag
```
DELETE /api/tags/:id
```
Requires Authentication: Yes (Bearer Token)

## Article Endpoints

### Get Articles (with pagination and filters)
```
GET /api/articles
```

Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Number of articles per page (default: 10)
- `published`: Filter by published status (true/false, default: true)
- `categoryId`: Filter by category ID
- `authorId`: Filter by author ID

### Get Article by ID
```
GET /api/articles/id/:id
```

### Get Article by Slug
```
GET /api/articles/slug/:slug
```

### Create Article
```
POST /api/articles
```
Requires Authentication: Yes (Bearer Token)

Request Body:
```json
{
  "title": "My First Article",
  "content": "This is the content of my article...",
  "excerpt": "A short excerpt of the article",
  "categoryId": 1,
  "tags": ["JavaScript", "React"],
  "published": true
}
```

### Update Article
```
PUT /api/articles/:id
```
Requires Authentication: Yes (Bearer Token)

Request Body:
```json
{
  "title": "Updated Article Title",
  "content": "Updated content...",
  "excerpt": "Updated excerpt",
  "categoryId": 2,
  "tags": ["JavaScript", "Node.js"],
  "published": true
}
```

### Delete Article
```
DELETE /api/articles/:id
```
Requires Authentication: Yes (Bearer Token)

## Authentication

For protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer your-jwt-token
```

## Error Responses

All endpoints return appropriate HTTP status codes:

- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Missing authentication
- `403 Forbidden`: Not authorized to perform the action
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists (e.g., duplicate category name)
- `500 Internal Server Error`: Server error

Error response format:
```json
{
  "message": "Error message",
  "error": "Detailed error information (only in development mode)"
}
```