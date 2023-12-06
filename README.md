# Express-Mongoose CRUD Server

This is a sample Node.js Express application developed with TypeScript and integrated with MongoDB using Mongoose. The application includes user management and order management features.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js: [Download here](https://nodejs.org/)
- MongoDB: [Download here](https://www.mongodb.com/try/download/community)

## Getting Started

1. Clone the repository:

   git clone : https://github.com/arafatdayan005/Express-Mongoose-Server.git

2. Navigate to the project directory:

cd your-repository

3. Install dependencies:
   npm install

4. Set up environment variables:

Create a .env file in the root of the project with the following content:

PORT = 5000,

DATABASE_URL = mongodb+srv://yourDatabaseName:password@cluster0.ltwq8j4.mongodb.net/?retryWrites=true&w=majority

5. Build the TypeScript code:

npm run build

6. Run project on localhost using 'npm run start:dev for development and npm run start:prod' for production purpose.

The application will be accessible at http://localhost:5000.

I have completed all instruction as mentioned. Here I have developed a CRUD operation that can manage users and user's order .
To GET & POST user data by using API Endpoints = '/api/users'
To GET, PUT, & DELETE specific user data by user id = '/api/users/:userId'
To GET & PUT product details to user order = '/api/users/:userId/orders'
To calculate total price of all orders of a specific user = '/api/users/:userId/orders/total-price'

**The project deployed on vercel : https://express-mongoose-server.vercel.app/**
