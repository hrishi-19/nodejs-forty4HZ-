# nodejs-forty4HZ-

A backend service for task resource.


## Feautures
 User signup and login

 CRUD operations on Task Resources
 
 User authentication using JWT

## SET UP
Clone the repository to your local machine

 To install the dependencies run the command
 ```bash 
    npm install
```



## To Run the project 
Set up the congiguration to your database in the dbconfig.js file
Store your env variables in .env file
start your mysql server

To start your nodejs server 
Run command
 ```bash 
    node server
```
or 
 ```bash 
    npm run dev
```
## Routes
### user
 GET user/createtableuser - create user table(note this route is created only for the convenience of creating the table)

 POST api/user/register - user registration

 POST api/user/login - user login

### task
 GET api/task/createtabletask - create task table(note this route is created only for the convenience of creating the table)

 GET api/task - get All tasks posted by the user

 POST api/task/ - Post a task

 PUT api/task/{tid} - update task 

 DELETE api/task/{tid} - delete task 

 GET api/task/{tid} - get task with id=tid

