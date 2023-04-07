import client from "../client";

/**
 * sdf
 */
async function test() {
  const knexClient = client.knexClient.getInstance();

  const result = await knexClient("users").select();
}

export const users = {
  test,
};
