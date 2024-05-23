var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")
var { ruruHTML } = require("ruru/server")
var { schema } = require("./src/graphql/schema")
var { root } = require("./src/graphql/resolvers")

//setup env variables
require('dotenv').config()

const PORT = process.env.PORT || 5100
 
var app = express()
 
// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Serve the GraphiQL IDE.
app.get("/ruru", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
  })
 
// Start the server at port
app.listen(PORT)
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)