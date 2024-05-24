import express from "express";
// const { createHandler } = require("graphql-http/lib/use/express");
import { ruruHTML } from "ruru/server";
import { schema } from "./src/graphql/schema.js";
import path from "path";
import { createYoga } from "graphql-yoga";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

//setup env variables
dotenv.config();

const PORT = process.env.PORT || 5100;

const app = express();

const gqlServer = createYoga({
  schema,
});

app.use("/graphql", gqlServer);

app.use("/media", express.static(path.join(__dirname, "public")));

// Serve the GraphiQL IDE.
app.get("/ruru", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Start the server at port
app.listen(PORT);
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
