import express from "express";

const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.listen(5555, () => {
  console.log(`Example app listening on port 5555`);
});
