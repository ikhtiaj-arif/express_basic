# Express + PostgreSQL Backend

A simple backend project built with Express, TypeScript, PostgreSQL, and Neon Serverless DB.

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Neon DB
- pg package

---

# Features Implemented

## 1. Express Server Setup

Created a basic Express server and started it using:

```ts
app.listen()
2. TypeScript Configuration

Added:

TypeScript
tsconfig.json
ts-node-dev
Express type support

Benefits:

Type safety
Better developer experience
Easier debugging
3. Express Middleware

Used built-in middleware to handle different request body formats.

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
Purpose
JSON → API data
Text → plain text
URL Encoded → form data
4. PostgreSQL Connection

Connected Neon PostgreSQL using pg package and Pool.

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
Why Pool?
Reuses DB connections
Better performance
Scalable
PostgreSQL Basics

PostgreSQL is a relational database using:

Tables
Rows
Columns
Common Data Types
BOOLEAN
INTEGER
VARCHAR
UUID
JSON
TIMESTAMP
ARRAY
Database Initialization

Created DB connection checker:

await pool.query("SELECT 1");
Create Users Table
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT,
  password VARCHAR(100),
  is_active BOOLEAN DEFAULT true
)
Concepts Used
PRIMARY KEY
UNIQUE
DEFAULT
SERIAL
Create User

Used parameterized query for security.

INSERT INTO users(name, email, age, password)
VALUES($1, $2, $3, $4)
RETURNING *
Why Parameterized Queries?

Prevents SQL Injection attacks.

Retrieve Users
Get Single User
SELECT * FROM users WHERE id=$1
Get All Users
SELECT * FROM users
WHERE Clause

Used to filter specific rows.

Update User

Used COALESCE to prevent data loss.

UPDATE users
SET
  name = COALESCE($1, name),
  age = COALESCE($2, age)
WHERE id = $3
RETURNING *
Why COALESCE?

Keeps old value if new value is not provided.

Project Structure
src/
├── app/
├── db/
├── modules/
├── app.ts
└── server.ts
Architecture Pattern

Used:

Route → Controller → Service → Database
Responsibilities
Router

Defines API endpoints.

Controller

Handles request and response.

Service

Contains business logic and DB queries.

Key Concepts Learned
Express setup
Middleware
TypeScript backend
PostgreSQL connection
CRUD operations
Parameterized queries
COALESCE
Connection Pooling
Clean Architecture
Router → Controller → Service pattern
Future Improvements
JWT Authentication
Password Hashing
Validation
Error Handling Middleware
Role Based Authorization
Docker
Prisma ORM