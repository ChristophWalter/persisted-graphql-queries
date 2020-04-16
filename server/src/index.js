const express = require("express")
const app = express()
const GraphqlRequestHandler = require("./graphqlRequestHandler")
const queries = require("./loadQueries")

app.use(express.json())

app.post("/graphql", new GraphqlRequestHandler(queries))

app.listen(8082, function () {
  console.log("Example app listening on port 8082!")
})
