This project is a Bookstore API built using Node.js, Express.js, and MySQL. 
The API supports user (buyer) and seller functionalities, where sellers can manage books via CSV upload,
and users can view books. Authentication and authorization are implemented to ensure proper access control.

  # THIS IS THE CODE STRUCTURE
          bookstore-backend/
          ├── config/
          │   └── db.config.js
          ├── controllers/
          │   ├── auth.controller.js
          │   ├── book.controller.js
          │   └── user.controller.js
          ├── middleware/
          │   ├── auth.middleware.js
          │   └── upload.middleware.js
          ├── models/
          │   ├── index.js
          │   ├── book.model.js
          │   └── user.model.js
          ├── routes/
          │   ├── auth.routes.js
          │   ├── book.routes.js
          │   └── user.routes.js
          ├── .env
          └── server.js
          





# Features
    User and seller registration (signup) with name, email, and password.
    Login functionality for both users and sellers using email and password.
    JWT-based authentication.
    Sellers can upload a CSV file to add multiple books to the database.
    Sellers can view, edit, and delete their own books.
    Users can view a list of all books and details of a specific book.


Prerequisites
  Node.js (v12.x or higher)
  MySQL


Installation
  Clone the repository:
  ```
  git clone https://github.com/BookTask.git
  cd bookstore
  npm install

```

## Set up the MySQL database:
    Open your MySQL client and run the following commands:
    CREATE DATABASE bookstore_db;
    (Optional) Create a MySQL user and grant permissions:

```
CREATE USER 'bookstore_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON bookstore_db.* TO 'bookstore_user'@'localhost';
```


## Environment Variables
    Create a .env file in the root directory of the project with the following content:
  ```
  PORT=3000
  DB_HOST=localhost
  DB_USER=bookstore_user
  DB_PASSWORD=your_password
  DB_NAME=bookstore_db
  JWT_SECRET=your_jwt_secret
```

Replace bookstore_user, your_password, bookstore_db, and your_jwt_secret with your actual database user, password, database name, and a secret key for JWT respectively.

# Running the Application
    Run database migrations:
    npx sequelize-cli db:migrate
    Start the server:
    npm start
    The server should now be running on http://localhost:3000.

### API Endpoints
    Authentication
      POST /api/auth/signup

      Register a new user or seller.
        Request body (JSON):
        {
          "name": "John Doe",
          "email": "john@example.com",
          "password": "password123",
          "role": "user" // or "seller"
        }


        
        POST /api/auth/login
        Login a user or seller.
        Request body (JSON):
        {
          "email": "john@example.com",
          "password": "password123"
        }


        
        Books (Seller Only)
        POST /api/books/upload
    
        Upload books via CSV file.
        Headers:
        x-access-token: your_jwt_access_token
        Body: form-data
        Key: file (type: File)
        
        
        
        GET /api/books/seller
        
        View all books uploaded by the seller.
        Headers:
        x-access-token: your_jwt_access_token
        
        
        PUT /api/books/
        Update a specific book.
        Headers:
        x-access-token: your_jwt_access_token
        Request body (JSON):
        {
          "title": "Updated Book Title",
          "author": "Updated Author",
          "price": 15.99
        }


        
        DELETE /api/books/
        Delete a specific book.
        Headers:
        x-access-token: your_jwt_access_token
        Books (Public)
        GET /api/books


        
        View all books.
        GET /api/books/

View details of a specific book.
