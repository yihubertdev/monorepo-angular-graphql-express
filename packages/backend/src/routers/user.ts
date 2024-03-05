import { API_METHOD, API_ROUTES } from "../utils/decorators";
import { ResponseHandler } from "../utils/routerResponse";
import { RoutesDecorator } from "../utils/decorators";
import { Response } from "express";

class User extends ResponseHandler {
  /**
   * Returns the public key from onmo-auth
   * @param {Request} _req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  @RoutesDecorator({
    PATH: API_ROUTES.USERS,
    METHOD: API_METHOD.GET,
  })
  get(_req: Request, res: Response): void {
    console.log("demo");
    res.json({
      data: "hje;;p",
    });
  }
}

export default new User();
