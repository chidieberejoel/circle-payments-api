import Joi from "@hapi/joi";
import { textSchema, numberSchema } from "./validate";

const curYear = new Date().getFullYear();

const validator = {
  user: Joi.object({
    idempotencyKey: textSchema(Joi, "idempotencyKey", 50, 2),
    number: textSchema(Joi, "number", 20, 2),
    cvv: textSchema(Joi, "cvv", 4, 3),
    name: textSchema(Joi, "name", 60, 2),
    city: textSchema(Joi, "city", 32, 2),
    country: textSchema(Joi, "country", 2, 2),
    line1: textSchema(Joi, "line1", 100, 2),
    district: textSchema(Joi, "district", 100, 2),
    postalCode: textSchema(Joi, "line1", 7, 3),
    expMonth: numberSchema(Joi, "expMonth", 12, 1),
    expYear: numberSchema(Joi, "expYear", curYear + 115, curYear),
  }),
};

export default validator;
