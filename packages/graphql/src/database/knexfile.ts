import type { Knex } from "knex";

/**
 * Generate knex configuration
 * @param {Partial<Knex.Config>} [options]
 * @returns {Knex.Config}
 */
export function generateKnexConfiguration(
  options: Partial<Knex.Config> = {}
): Knex.Config {
  return {
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
}

module.exports = (): { [key: string]: Knex.Config } => {
  const configuration = generateKnexConfiguration();
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
