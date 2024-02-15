import admin from "firebase-admin";
import serviceAccount from "../firebase-admin.json";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});
import { server } from "./graphql";
import { onRequest } from "firebase-functions/v1/https";
import express from "express";
const app = express();
async function startServer() {
  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
    cors: true,
    bodyParserConfig: true,
  });
}
startServer();
exports.graphql = onRequest(app);
