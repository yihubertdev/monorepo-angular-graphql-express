import clients from "../client";

/**
 * sdf
 */
async function test() {
  const knexClient = clients.knexClient.getInstance();

  const result = knexClient("users").select();

  console.log(result);
}
