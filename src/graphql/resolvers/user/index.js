import { Hash, errorResponse } from "../../../utils";
import { signupValidation, loginValidation } from "../../../helpers";

const Resolver = {
  Query: {
    me: async (_root, _args, { user }) => user,
  },
  Mutation: {
    signin: loginValidation(async (_root, { input }, { User }) => {
      const { email } = input;
      const user = await User.getUserByEmail(email);
      if (!user) {
        return errorResponse(
          "AuthenticationError",
          "Username or password is incorrect",
        );
      }
      const password = Hash.compareHash(
        input.password,
        user.hash,
        user.salt,
      );
      if (!password) {
        return errorResponse(
          "AuthenticationError",
          "Username or password is incorrectt",
        );
      }
      try {
        const data = {
          id: user.id,
          email: user.email,
          isActive: user.isActive,
          level: user.level,
        };
        const token = Hash.generateToken(data);
        return { user, token };
      } catch (error) {
        return errorResponse("AuthenticationError", error);
      }
    }),

    signup: signupValidation(async (_root, { input }, { User }) => {
      const { email } = input;
      const user = await User.getUserByEmail(email);
      if (user) {
        return errorResponse("ValidationError", "Email has been used");
      }
      try {
        const newUser = await User.createUser(input);
        return newUser;
      } catch (error) {
        return errorResponse("Error", error);
      }
    }),
  },
};

export default Resolver;
