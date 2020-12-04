var express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./app/graphql/schema/index");
const root = require("./app/graphql/resolvers/index");

// const schema = require("./app/graphql/schema/type");

// 连接数据库
const db = require("./app/models");
db.mongoose
  .connect(db.testUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const app = express();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Max application." });
});
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   graphiql: true,
// }));

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});