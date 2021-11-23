# Workout Log App

This is a full stack CRUD application developed using React, JavaScript, HTML, Bootstrap, CSS, Express, Axios, MongoDB Atlas and Mongoose.

## Description

This is an app for keeping track of workouts. In this app, the user can register as a new user, sign in and out, create, read, update and delete workout logs, as well as search for previous logs by entry date. The data is stored in a MongoDB database.

## Installation and usage

In order to install and use this app, you will need to have NodeJS and npm installed on your computer. Download this project, navigate to the project folder in your terminal, install the dependencies running the command `npm install`.

You will also need to initiate a MongoDB instance and copy-paste the url of the database to the project.

In order to avoid hardcoding the address of the database in the source code, the address of the database should be passed to the application via the 'MONGODB_URI' environment variable. One way to define the value of an environment variable is to use the 'dotenv' library, which is installed running the command `npm install dotenv`. Once dotenv is installed, create a .env file at the root of the project. The environment variables 'MONGODB_URI' and 'PORT' are to be defined inside of the newly created .env file. Set the 'MONGODB_URI' variable equal to the address of your database and the 'PORT' variable equal to 3001 (proxy of this project: localhost:3001).

## Starting the app

In the backend:

-In development mode (with hot reload): `npm run dev`

-In normal mode ( = production mode, no hot reload): `npm start`

In the frontend:

-In development mode (with hot reload): `npm start`

## Running the tests

-Tests in the backend: run the command `npm run test`, previously set up in the package.json of the backend.

-E2E tests: To run the E2E tests, both the frontend and backend must be running. Run the backend in test mode by starting it with the command `npm run start:test`, previously set up in the package.json of the backend. Once both the backend and frontend are running, start Cypress with `npm run cypress:open`, previously configured in the package.json in the frontend.
