# Workout Log App

This is a full stack CRUD application developed using React, JavaScript, HTML,  
Bootstrap, Express, Axios, MongoDB Atlas and Mongoose.

Demo: https://workout-demo.rcsoftdev.com/

## Description

This is an app for keeping track of workouts. In this app, the user can  
register as a new user, sign in and out, create, read, update and delete  
workout logs, as well as search for previous logs by entry date. The data is  
stored in a MongoDB database.

## Installation and usage

In order to install and use this app locally, you will need to have NodeJS  
and npm installed on your computer. Download this project, navigate to the  
project folder in your terminal, install the dependencies running the command  
`npm install`.

You will also need to initiate a MongoDB instance (for example, by using  
MongoDB Atlas). Within your database, you can create two collections: one  
will be the actual database used in development and production mode and the  
other one will be the database used in the test mode. You will have to  
copy-paste the urls of the collections to the project.

In order to avoid hardcoding in the source code certain sensitive information  
(the database addresses, the port and the 'SECRET' variable used for digitally  
signing the user's token), those pieces of information should be passed to the  
application as environment variables. One way to define the value of an  
environment variable is to use the 'dotenv' library, which is installed as part  
of the package.json dependencies. Once dotenv is installed (by initially  
running `npm install`), create a .env file at the root of the backend project.  
The environment variables 'MONGODB_URI', 'TEST_MONGODB_URI', 'PORT' and  
'SECRET' are to be defined inside of the newly created .env file. Set the  
'MONGODB_URI' variable equal to the address of your database used for  
development and production mode, set the 'TEST_MONGODB_URI' variable equal to  
the address of your database used for test production, set the 'PORT' variable  
equal to 3001 (proxy of this project: localhost:3001) and set the 'SECRET'  
variable to a string of your choice.

## Starting the app

In the backend:

-In development mode (with hot reload): `npm run dev`

-In normal mode (= production mode, no hot reload): `npm start`

In the frontend:

-In development mode (with hot reload): `npm start`

## Running the tests

-Tests in the backend: run the command `npm run test`, previously set up in the  
package.json of the backend.

-E2E tests: To run the E2E tests, both the frontend and backend must be running.  
Run the backend in test mode by starting it with the command  
`npm run start:test`, previously set up in the package.json of the backend.  
Once both the backend and frontend are running, start Cypress with  
`npm run cypress:open`, previously configured in the package.json in the  
frontend.
