import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../firebase-admin.json";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
import { server } from "./graphql";
import express from "express";
import { onRequest } from "firebase-functions/v1/https";
import cors from "cors";
const graphqlHost = express();

/**
 *
 */
async function startServer() {
  await server.start();
  server.applyMiddleware({
    app: graphqlHost,
    path: "/",
    cors: true,
    bodyParserConfig: true,
  });
}
startServer();
exports.graphql = onRequest(graphqlHost);

const rest = express();

rest.use(express.json());
rest.use(express.text());
rest.use(cors());

rest.get("/", (req, res) => {
  res.send("Hello World!");
});

exports.rest = onRequest(rest);
