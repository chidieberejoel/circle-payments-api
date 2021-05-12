import User from "./resolvers/user";
import { dateScalarType } from "./scalars";
import { card, payment } from "./resolvers/payment";

export default [dateScalarType, User, card, payment];
