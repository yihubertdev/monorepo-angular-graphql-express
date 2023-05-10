import serverless from "serverless-http";
import express, { Request, Response } from "express";
import "./rest-api/controllers"; // This is important

export const app = express();
app.use(express.json());
app.use(express.text());
app.set("trust proxy", true);

app.use((_req: Request, res: Response): void => {
  res.status().json({
    message: "Page Not Found",
  });
  return;
});

export const handler = serverless(app);
