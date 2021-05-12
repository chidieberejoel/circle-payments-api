export const textSchema = (joiObject, field, max, min) => joiObject
  .string()
  .trim()
  .min(min)
  .max(max)
  .required()
  .messages({
    "string.base": `${field} must be a valid string`,
    "string.empty": `${field} cannot be an empty string`,
    "string.min": `${field} must be at least ${min} characters long`,
    "string.max": `${field} must be at most ${max} characters long`,
    "any.required": `${field} is required`,
  });

export const textSchemaNotReq = (joiObject, field, max, min) => joiObject
  .string()
  .min(min)
  .max(max)
  .messages({
    "string.base": `${field} must be a valid string`,
    "string.min": `${field} must be at least ${min} characters long`,
    "string.max": `${field} must be at most ${max} characters long`,
  });

export const passwordSchema = (joiObject, field, max, min) => joiObject
  .string()
  .trim()
  .min(min)
  .max(max)
  .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{6,})"))
  .required()
  .messages({
    "string.base": `${field} must be a valid string`,
    "string.empty": `${field} cannot be an empty string`,
    "string.min": `${field} must be at least ${min} characters long`,
    "string.max": `${field} must be at most ${max} characters long`,
    "string.pattern.base": `${field} should contain an uppercase, a lowercase and a number`,
    "any.required": `${field} is required`,
  });

export const emailSchema = (joiObject, field) => joiObject
  .string()
  .trim()
  .email()
  .required()
  .messages({
    "string.base": "Email address must be a valid string",
    "string.empty": "Email address cannot be an empty string",
    "any.required": `${field} is required`,
    "string.email": "The Email address is invalid",
  });

export const numberSchema = (joiObject, field, max, min) => joiObject
  .number()
  .min(min)
  .max(max)
  .required()
  .positive()
  .messages({
    "number.base": `${field} must be a valid number`,
    "number.empty": `${field} cannot be an empty number`,
    "number.min": `${field} must be at least ${min}`,
    "number.max": `${field} must be at most ${max}`,
    "any.required": `${field} is required`,
  });
