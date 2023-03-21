import type { Knex } from "knex";
import client from "../client";

module.exports = (): { [key: string]: Knex.Config } => {
  const configuration = client.knexClient.generateKnexConfiguration();
  return {
    development: {
      ...configuration,
      migrations: {
        extension: "ts",
        directory: "./migrations",
        stub: "./migrations/stub.ts",
      },
    },
  };
};
