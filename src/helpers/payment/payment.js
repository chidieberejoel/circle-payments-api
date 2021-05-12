import { validator, errorResponse } from "../../utils";

const { payment } = validator;

const paymentArgsValidation = (next) => async (root, args, context, info) => {
  try {
    await payment.user.validateAsync(args.input);
    return next(root, args, context, info);
  } catch (error) {
    return errorResponse("UserInputError", error.message);
  }
};

export default paymentArgsValidation;
