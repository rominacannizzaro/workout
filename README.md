# Workout Log App

This is a simple full stack CRUD application developed using React, JavaScript, HTML, Express, Axios, MongoDB Atlas and Mongoose.

## Description
This is an app for keeping track of workouts. In this app, the user can create, read, update and delete workout logs, as well as search for previous logs by entry date. The data is stored in a MongoDB database.

## Installation and usage
In order to install and use this app, you will need to have NodeJS and npm installed on your computer. Download this project, navigate to the project folder in your terminal, install the dependencies running the command ```npm install```. 

You will also need to initiate a MongoDB instance and copy-paste the url of the database to the project.

In order to avoid hardcoding the address of the database in the source code, the address of the database should be passed to the application via the 'MONGODB_URI' environment variable. One way to define the value of an environment variable is to use the 'dotenv' library, which is installed running the command ```npm install dotenv```. Once dotenv is installed, create a .env file at the root of the project. The environment variables 'MONGODB_URI' and 'PORT' are to be defined inside of the newly created .env file. Set the 'MONGODB_URI' variable equal to the address of your database and the 'PORT' variable equal to 3001 (proxy of this project: localhost:3001).

Launch the app by typing ```npm start```.



