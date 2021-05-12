import { validator, errorResponse } from "../../utils";

const { card } = validator;

const cardArgsValidation = (next) => async (root, args, context, info) => {
  try {
    await card.user.validateAsync(args.input);
    return next(root, args, context, info);
  } catch (error) {
    return errorResponse("UserInputError", error.message);
  }
};

export default cardArgsValidation;
