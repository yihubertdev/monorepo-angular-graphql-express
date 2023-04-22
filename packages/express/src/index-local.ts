// ensure dotenv runs before anything else
// eslint-disable-next-line @typescript-eslint/no-unsafe-call,import/no-extraneous-dependencies
require("dotenv").config();
import { app } from "./index";

app.listen(3000, () => {
  console.log("App running on port 3000");
});
