import { knex, Knex } from "knex";
import { generateKnexConfiguration } from "../database/knexfile";

/**
 * Create a Knex instance
 * @param {Partial<Knex.Config>} [options]
 * @returns {Knex}
 */
function getInstance(options: Partial<Knex.Config> = {}): Knex {
  const config = generateKnexConfiguration(options);

  return knex(config);
}

export const knexClient = {
  getInstance,
};
