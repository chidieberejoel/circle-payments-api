import { v4 as uuidv4 } from "uuid";
import { camelCase } from "../utils";
import { db, payment } from "../db";

class PaymentDB {
  static async createPayment(args) {
    const id = uuidv4();
    const {
      userId,
      paymentId,
      sourceId,
      amount,
      status,
      currency,
      sourceType,
      receivableAmount,
      levelFrom,
      levelTo,
      errorCode,
      createDate,
      updateDate,
    } = args;

    const payload = [
      id,
      userId,
      paymentId,
      sourceId,
      amount,
      status,
      currency,
      sourceType,
      receivableAmount,
      levelFrom,
      levelTo,
      errorCode,
      createDate,
      updateDate,
    ];

    const { rows } = await db.query(payment.createPayment, payload);
    return camelCase(rows)[0];
  }

  static async pendingOrConfirmedPayments(paid, failed) {
    const { rows } = await db.query(payment.findPendingOrConfirmedPayments, [
      paid,
      failed,
    ]);
    return camelCase(rows);
  }

  static async updatePayments(id, newStatus, time) {
    const { rows } = await db.query(payment.updateStatus, [
      id,
      newStatus,
      time,
    ]);
    return camelCase(rows)[0];
  }

  static async findByUserId(id) {
    const { rows } = await db.query(payment.findByUserId, [id]);
    return camelCase(rows);
  }
}

export default PaymentDB;
