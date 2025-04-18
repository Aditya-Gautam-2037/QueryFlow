# QueryFlow

QueryFlow is a web-based application that allows users to upload files (CSV or images), generate SQL queries, and execute them on a database. It provides a user-friendly interface for managing and querying data.

## Features

- **User Authentication**: Secure login and registration system.
- **File Upload**: Upload CSV or image files to generate SQL scripts.
- **SQL Execution**: Execute SQL queries directly from the interface.
- **Query History**: View and manage previously executed queries.
- **Table Management**: View, create, and drop tables in the database.
- **Dark Mode**: Toggle between light and dark themes for better usability.




## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- MySQL
- SQLite
- Multer (for file uploads)

### Frontend
- React.js
- Bootstrap
- Vite.js

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB and MySQL databases set up

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd sql-playground-backend
   npm install

2. Create a .env file and configure the following:

PORT=5000
MONGO_URI=mongodb://localhost:27017/sqlplayground
DB_HOST=localhost
>
DB_USER=<your_mysql_user   DB_PASS=<your_mysql_password>
DB_NAME=<your_mysql_database>
JWT_SECRET=<your_jwt_secret>

3.Start the backend server:
   ```bash
   npm app.js
```
### Frontend Setup
1.Navigate to the frontend directory:
```bash
cd sql-playground-frontend
```
2.Install dependencies:
```bash
npm install
```
3.Start the development server:
```bash
npm run dev
```
# Usage
1.Open the frontend in your browser at link provided by npm.

2.Register or log in to access the dashboard.

3.Upload a CSV or image file to generate SQL scripts.

4.Execute SQL queries and manage tables directly from the interface.

