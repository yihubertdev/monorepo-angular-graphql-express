import * as Joi from "joi";
import { JoiSchemaBuilder } from "../utils/validator";
import { ICollectionQueryBuilder } from "types";

export const subCollectionBuilderSchema: JoiSchemaBuilder<
  ICollectionQueryBuilder<any>
> = (
  data: ICollectionQueryBuilder<any>,
  errorLocation?: string
): Joi.ObjectSchema => {
  return Joi.object({
    next: Joi.object().optional(),
    documentId: Joi.string().required(),
    collectionId: Joi.when(Joi.ref("next"), {
      is: Joi.exist(),
      then: Joi.string().required(),
      otherwise: Joi.forbidden(),
    }),
    documentValue: Joi.when(Joi.ref("next"), {
      is: Joi.exist(),
      then: Joi.forbidden(),
      otherwise: Joi.string().required(),
    }),
  });
};
