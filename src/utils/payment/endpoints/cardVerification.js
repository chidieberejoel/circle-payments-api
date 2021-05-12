import { axiosCreate, errorResponse } from "../../index";

class cardVerification {
  static async verify(id) {
    try {
      const verifyCard = await axiosCreate.get(`/cards/${id}`);
      return verifyCard.data;
    } catch (error) {
      return errorResponse("Error", error);
    }
  }
}

export default cardVerification;
