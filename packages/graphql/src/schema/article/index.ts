import path from "path";
import fs from "fs";

export const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);
export const resolvers = {
  Query: {
    anotherhello: () => "world",
    anotherAnotherHello: () => "anotherAnotherHello",
  },
};
