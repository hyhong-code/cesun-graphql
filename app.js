require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./graphql/schema/index");
const rootValue = require("./graphql/resolvers/index");
const connectDB = require("./config/db");
const isAuth = require("./middlewares/isAuth");

connectDB();
const app = express();

// Middlewares
app.use(express.json());
app.use(isAuth);

// GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server up on port ${port}...`));
