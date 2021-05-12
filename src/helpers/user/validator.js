import { validator, errorResponse } from "../../utils";

const { user } = validator;

const signupValidation = (next) => async (root, args, context, info) => {
  try {
    await user.user.validateAsync(args.input);
    return next(root, args, context, info);
  } catch (error) {
    return errorResponse("UserInputError", error.message);
  }
};

const loginValidation = (next) => async (root, args, context, info) => {
  try {
    await user.login.validateAsync(args.input);
    return next(root, args, context, info);
  } catch (error) {
    return errorResponse("UserInputError", error.message);
  }
};

export { signupValidation, loginValidation };
