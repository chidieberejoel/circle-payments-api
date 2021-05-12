# circle-payments-api

## Installation and Set up

-Node.js should be installed. Get Node.js [here](https://nodejs.org/en/download/).\
-PostgreSQL should also be installed on your local machine. Get [here](https://www.postgresql.org/download/).\
-Navigate to a directory of your choice using a CLI and run the following commands in the order:
```
git clone https://github.com/chidieberejoel/circle-payments-api.git
cd circle-payments-api
```
## Run the application
Rename the [env.dev.template](env.dev.template) file to .env and configure the variables with data from your Local PostgreSQL Database \
Also, visit [Here](https://my-sandbox.circle.com/) to get a value for your **Circle API Key** and configure it in your .env file\
Then in your CLI, run the following commands in the order:
```
npm install
npm run migrate:up
npm run server
```
Then load <http://localhost:5001/graphql> in your browser. \
If you successfully completed all the above steps, then you should be directed to a GraphQL Playground.

## Test
To run test, configure your .env file to match the [env.test.template](env.test.template)  file\
Then, run the following command
```
npm run test
```

#### Note
Please, ensure you have a database name that matches the database variables in your .env file created on your local postgreSQL server :)
