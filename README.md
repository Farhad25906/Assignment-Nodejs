# 📚 Library Management System

A robust and efficient **Library Management System** built with **TypeScript**, **Express.js**, and **MongoDB**.  
This project manages books and borrowing operations using RESTful APIs with strong typing, modular design, and Mongoose models.

🌐 **Live URL:** [Library Management System](https://library-management-assignment-03-sable.vercel.app/)

---

## 🚀 Features

- 📘 **Book Management** — Create, read, update, and delete books.  
- 🔍 **Filtering & Sorting** — Fetch books by genre, sort by fields, and limit results.  
- 📚 **Borrow Management** — Borrow books, track due dates, and update availability.  
- 🧩 **Aggregation Pipeline** — Generate borrowed book summaries.  
- ⚙️ **Environment Variables** — Secure app configuration using `.env`.  
- 💪 **TypeScript** — Type-safe backend with better maintainability.  
- 🌍 **CORS Enabled** — For frontend communication.  
- 🗄️ **MongoDB + Mongoose** — Schema-based and scalable data management.

---


## 📡 API Endpoints

| Method | Endpoint | Description |
|---------|-----------|--------------|
| **POST** | `/api/books` | Create a new book |
| **GET** | `/api/books` | Get all books (supports filtering, sorting, pagination) |
| **GET** | `/api/books/:bookId` | Get book details by ID |
| **PUT** | `/api/books/:bookId` | Update book details |
| **DELETE** | `/api/books/:bookId` | Delete a book |
| **POST** | `/api/borrow` | Borrow a book |
| **GET** | `/api/borrow` | Get borrowed books summary (using aggregation) |


---

---

## 🛠️ Tech Stack

| Technology | Description |
|-------------|-------------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Backend framework for Node.js |
| **TypeScript** | Superset of JavaScript providing static typing |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM (Object Data Modeling) library for MongoDB |
| **dotenv** | Environment variable management |
| **ts-node-dev** | Development server with auto-restart on file changes |

---

## 📂 Project Structure
```bash
library-management-assignment-03/
├── src/
│   ├── config/
│   │   └── index.ts              # Application configuration
│   ├── modules/
│   │   ├── books/                # Book management module
│   │   │   ├── book.model.ts
│   │   │   ├── book.controller.ts
│   │   │   ├── book.service.ts
│   │   │   └── book.interface.ts
│   │   ├── borrowBooks/          # Borrowing operations module
│   │   │   ├── borrowBooks.model.ts
│   │   │   ├── borrowBooks.controller.ts
│   │   │   ├── borrowBooks.service.ts
│   │   └── └── borrowBooks.interface.ts
│   ├── routes/
│   │   └── index.ts              # Route definitions
│   ├── app.ts                    # Express application setup
│   └── server.ts                 # Server entry point
├── .env                          # Environment variables
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation


## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/library-management-assignment-03.git
cd library-management-assignment-03 
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Create a .env file
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```
### 4️⃣ Run the development server
```bash
npm run dev
```
