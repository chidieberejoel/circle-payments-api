import { errorResponse } from "../utils";

const basicToPremium = 1.01;
const basicToPro = 3.09;
const premiumToPro = 2.0;

const changeLevel = (initLevel, upgrade) => {
  try {
    let charge;
    switch ((initLevel, upgrade)) {
      case ("basic", "premium"):
        charge = basicToPremium;
        break;
      case ("basic", "pro"):
        charge = basicToPro;
        break;
      case ("premium", "pro"):
        charge = premiumToPro;
        break;
      default:
        charge = "";
    }
    return charge;
  } catch (error) {
    return errorResponse("UserInputError", error);
  }
};

export default changeLevel;
