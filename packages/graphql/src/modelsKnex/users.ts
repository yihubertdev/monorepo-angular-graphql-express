import { Knex } from "knex";

/**
 * sdf
 */
async function test(knexClient: Knex) {
  const result = await knexClient("users").select();
}

export const users = {
  test,
};
