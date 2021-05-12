import db from "./setup/postgres";
import user from "./queries/user";
import card from "./queries/card";
import payment from "./queries/payment";

export {
  db, user, card, payment,
};
