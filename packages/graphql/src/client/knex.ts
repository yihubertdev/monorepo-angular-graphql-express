import { knex, Knex } from "knex";
import { generateKnexConfiguration } from "../database/knexfile";

/**
 * Create a Knex instance
 * @param {Partial<Knex.Config>} [options]
 * @returns {Knex}
 */
function getInstance(options: Partial<Knex.Config> = {}): Knex {
  const config = {
    client: "mysql",
    connection: {
      insecureAuth: true,
      host: process.env["RDS_ENDPOINT"] || "localhost",
      user: process.env["RDS_ENDPOINT"] || "root",
      password: process.env["RDS_PASSWORD"] || "abc123",
      database: process.env["RDS_DB_NAME"] || "tech_blog",
    },
    pool: { min: 1, max: 1 },
    ...options,
  };

  return knex(config);
}

export const knexClient = {
  getInstance,
};
