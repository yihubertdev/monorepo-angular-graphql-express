import path from "path";
import fs from "fs";
import {
  FieldResolver,
  RESOLVER_TYPE,
  Resolver,
} from "../../decorators/resolver";
import { IFaceGraphqlContext } from "../../";
import models from "../../models";

@Resolver(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"))
class UserResolver {
  @FieldResolver({
    type: RESOLVER_TYPE.QUERY,
  })
  posts(source, args, context: IFaceGraphqlContext, info) {
    console.log(context.remoteAddress);
    if (context.remoteAddress) {
      models.firestore.checkin.addCheckInAddress(
        context.remoteAddress,
        context.fireStoreClient
      );
    }

    return false;
  }

  @FieldResolver({
    type: RESOLVER_TYPE.MUTATION,
  })
  postUser(source, args, context, info) {
    console.log(args);
    const i = 1;
    return "hello";
  }
}

export default new UserResolver();
