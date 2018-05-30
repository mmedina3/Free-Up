# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

# Prerequisites
You are going to need Node.js and npm, and MySQL installed on your machine.

# Installing

1. Clone the repository

`$ git clone <link>`
then go into the file
`$ cd <freeup clone>`


2. Enter Backend directory and enter npm install

`$cd freeup/backend` 
`$npm install --save`

3. Enter Frontend directory and enter npm install

`$cd freeup/frontend`  
`$npm install --save`

4. Starting the repository on your machine
You will need to run Backend & Frontend seperately, ports are already configured. (will add instructions for npm dev)

a. Enter Frontend directory and do npm start

`$cd freeup/frontend`  
`npm start`

b. Enter Backend directory and do npm start

`$ cd freeup/backend `
`$npm start`

Now you can load localhost:3000 (sometimes 3001) in your browser and use the app.

# Installing MySQL
1. Create a new database and title it **freeup_db**
2. Create two seperate tables and title them **post** and **user**
3. Inside the **post** table create the following categories:
**post_id**
**image_data**
**availabiity**
**date_added**
**date_created**
**user_id**
4. Inside the **user** table create the following categories:
**user_id**
**Name** (note: the N is capital)
**email**
**location**

5.Now go back into your backend and install MySQL
`$cd freeup/backend`
`$brew install mysql`



# Built With
React - Frontend javascript library
Node - Backend framework
Express - Node.js web application framework
MySQL- Database manager system

