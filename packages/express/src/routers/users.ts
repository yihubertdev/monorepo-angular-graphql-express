import { ResponseHandler } from "../handlers/response";
import Router from "../decorators/routes";
import { API_METHOD, API_ROUTES } from "../decorators/constants";

class User extends ResponseHandler {
  /**
   * Returns the public key from onmo-auth
   *
   * @param {Request} _req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  @Router({
    PATH: API_ROUTES.USERS,
    METHOD: API_METHOD.GET,
  })
  async get(_req: Request, res: Response): Promise<void> {
    console.log("demo");
    return;
  }
}

export default new User();
