import { merge } from "lodash";
import fs from "fs";
import path from "path";

const SchemaTypeDefs = fs.readFileSync(
  path.join(__dirname, "../schema/schema.graphql"),
  "utf8"
);

export let totalResolver = {};
export const totalTypeDefs: string[] = [SchemaTypeDefs];
export const Query = () => {
  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    const query = {};
    query[memberName] = propertyDescriptor.value;

    const estt = {
      Query: query,
    };

    totalResolver = merge(totalResolver, estt);
  };
};

export const Mutation = () => {
  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    const mutation = {};
    mutation[memberName] = propertyDescriptor.value;

    totalResolver = merge(totalResolver, {
      Mutation: mutation,
    });
  };
};

export const Resolver = (typeDefs: string) => {
  return (target: Function) => {
    totalTypeDefs.push(typeDefs);
  };
};
