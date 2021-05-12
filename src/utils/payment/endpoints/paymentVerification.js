import { axiosCreate, errorResponse } from "../../index";

class paymentVerification {
  static async verify(id) {
    try {
      const verifyCard = await axiosCreate.get(`/payments/${id}`);
      return verifyCard.data;
    } catch (error) {
      return errorResponse("Error", error);
    }
  }
}

export default paymentVerification;
