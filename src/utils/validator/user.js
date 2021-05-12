import Joi from "@hapi/joi";
import { textSchema, emailSchema, passwordSchema } from "./validate";

const validator = {
  user: Joi.object({
    firstName: textSchema(Joi, "firstName", 32, 2),
    lastName: textSchema(Joi, "lastName", 32, 2),
    email: emailSchema(Joi, "email"),
    password: passwordSchema(Joi, "password", 100, 5),
  }),
  login: Joi.object({
    email: emailSchema(Joi, "email"),
    password: passwordSchema(Joi, "password", 100, 5),
  }),
  email: Joi.object({
    email: emailSchema(Joi, "email"),
  }),
};

export default validator;
