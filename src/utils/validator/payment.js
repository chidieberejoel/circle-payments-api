import Joi from "@hapi/joi";
import { textSchema, textSchemaNotReq } from "./validate";

const validator = {
  user: Joi.object({
    idempotencyKey: textSchema(Joi, "idempotencyKey", 50, 2),
    upgrade: textSchema(Joi, "number", 7, 3),
    description: textSchemaNotReq(Joi, "cvv", 400, 1),
  }),
};

export default validator;
