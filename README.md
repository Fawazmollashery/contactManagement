Here's a detailed `README.md` file for your **Contact Manager Application** with React frontend and Node.js/Express backend, connected to MongoDB:

---

# Contact Manager Application

This is a **Contact Manager** application that allows users to add, view, and delete contact information. The application uses **React** for the frontend and **Node.js/Express** for the backend. It stores contact information in a **MongoDB** database. 

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Troubleshooting](#troubleshooting)

---

## Features

- Add new contacts with name, phone number, and email.
- Display a list of contacts.
- Delete contacts from the list.
- Store contacts in a MongoDB database.
- Modern and responsive UI using Material UI.

---

## Technologies Used

### Frontend:
- **React.js** (JavaScript library for building user interfaces)
- **Material UI** (for styled components)
- **Fetch API** (for making HTTP requests)

### Backend:
- **Node.js** (JavaScript runtime)
- **Express.js** (web framework for Node.js)
- **MongoDB** (NoSQL database)
- **Mongoose** (for MongoDB object modeling)

---

## Prerequisites

Before running the application, make sure you have the following software installed on your machine:

1. **Node.js** (version 14+)
2. **MongoDB** (Local or Atlas cloud-based)
3. **npm** (Node package manager, comes with Node.js)

---

## Getting Started

To get the application running locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/contact-manager-app.git
cd contact-manager-app
```

### 2. Set Up MongoDB

- **MongoDB Atlas**: 
  - Create a new cluster and obtain your MongoDB connection URI.
  - Whitelist your current IP address for database access.
  
- **Local MongoDB**:
  - Install MongoDB locally and ensure it's running.
  - No connection URI changes are needed if using `mongodb://localhost:27017`.

---

## Running the Application

### Backend Setup

1. **Navigate to the backend folder**:
   
   ```bash
   cd contact-backend
   ```

2. **Create a `.env` file** in the `contact-backend` directory to store your MongoDB connection string:

   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   PORT=5000
   ```

   Replace `<username>`, `<password>`, and `<dbname>` with your actual MongoDB credentials.

3. **Install Backend Dependencies**:

   ```bash
   npm install
   ```

4. **Start the Backend Server**:

   ```bash
   npm start
   ```

   The server will start at `http://localhost:5000/`.

### Frontend Setup

1. **Navigate to the frontend folder**:
   
   ```bash
   cd ../contact-frontend
   ```

2. **Install Frontend Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Frontend**:

   ```bash
   npm start
   ```

   The frontend React application will start at `http://localhost:3000/`.

---

## API Endpoints

The following endpoints are available in the backend API (running on port `5000`):

1. **GET /contacts** - Retrieve all contacts.
   - **URL**: `http://localhost:5000/contacts`
   - **Response**: JSON array of all contacts in the database.

2. **POST /contacts** - Add a new contact.
   - **URL**: `http://localhost:5000/contacts`
   - **Request Body** (JSON):
     ```json
     {
       "name": "John Doe",
       "phone": "1234567890",
       "email": "john.doe@example.com"
     }
     ```
   - **Response**: The newly created contact.

3. **DELETE /contacts/:id** - Delete a contact by its ID.
   - **URL**: `http://localhost:5000/contacts/:id`
   - **Response**: Confirmation message of deletion.

---

## Folder Structure

```
contact-manager-app/
│
├── contact-backend/
│   ├── server.js         # Main server file
│   ├── models/           # MongoDB Models
│   ├── routes/           # Express Routes
│   ├── .env              # MongoDB URI and PORT
│   ├── package.json      # Backend dependencies
│
├── contact-frontend/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── App.css       # Styling for the app
│   ├── package.json      # Frontend dependencies
│
├── README.md             # Documentation
```

---

## Troubleshooting

1. **Port Already in Use Error**:
   - If you encounter the error `EADDRINUSE: Address already in use :::5000`, it means the port is already in use. To resolve this:
     - Stop any other process using the port or change the port number in your `.env` file.

2. **MongoDB Connection Issues**:
   - If you receive an error like `querySrv ENOTFOUND _mongodb._tcp`, ensure:
     - Your MongoDB URI is correct.
     - Your IP is whitelisted (for MongoDB Atlas).
     - The MongoDB service is running (for local MongoDB).

3. **Cross-Origin Resource Sharing (CORS) Issues**:
   - If your frontend cannot communicate with the backend, ensure that CORS is enabled in your backend server (`app.use(cors());`).

---

