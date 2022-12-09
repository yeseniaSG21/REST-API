# School Database REST-API
 
This project creates a REST API using Express. The API will provide a way to administer a school database containing information about users and courses. Users can interact with the database to create new courses, retrieve information on existing courses, and update or delete existing courses. To make changes to the database, users will be required to log in so the API will also allow users to create a new account or retrieve information on an existing account.

This project:
* Used my knowledge of Node.js, Express, REST APIs, and Sequelize. 
* Used Postman on RESTAPI.postman_collection.json for exploring and testing the REST API. 

## To run project:
First, install project's dependencies:

```bash
  npm install
```
Next, populate the database:

```bash
  npm run seed
```
Lastly, start the application:

```bash
  npm start
```

## Next Steps:
In a next project, I will expand this project by using React to create a front-end client that uses this REST API as a part of a full-stack JavaScript application.