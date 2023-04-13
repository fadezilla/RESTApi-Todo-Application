# REST API - Course Assignment
This is a REST API course assignment project. The API provides endpoints for managing Todo items with categories. The API is secured with bearer token
authentication and allows users to perform CRUD operations in both Todos and categories.
# Application Installation and Usage Instructions
To use this API, you need to have Node.js and mySQL installed on your system. once installed,
follow the steps below to set up and use the API:

1. Clone the repository from GitHub.
2. Run `npm install` to install the dependencies.
3. Set up the environment variables as described in the section below.
4. run `npm start` to start the server.
5. Use Postman or any other similar programs to test the API endpoints.

# Environment Variables
The following environment variables are required to run the API:

* `DATABASE_NAME` : Name of the database
* `TOKEN_SECRET`: A secret key used for JWT token encryption and decryption

you can also set the following optional environment variables:

* `PORT`: The port number on which the server will listen to. Default is `3000`.
if you wanna use test the api you can also use:
* `TEST_EMAIL`: a dummy email used for testing the api
* `TEST_PASSWORD`: a dummy password used for testing the api
# Additional Libraries/Packages
The API uses the following additional libraries/packages:

* Express.js: Framework for Node.js.
* Sequelize: An ORM for Node.js
* jsonwebtoken: A library for authentication and authorization.
* jsend: A simple format for JSON responses in RESTful APIs.

# NodeJS Version Used
 v18.13.0

# POSTMAN Documentation link
https://documenter.getpostman.com/view/25180838/2s93Xwy3Vr

