import { v4 as uuidv4 } from "uuid";
import { camelCase } from "../utils";
import { db, card } from "../db";

class CardDB {
  static async createCard(args) {
    const id = uuidv4();
    const {
      cardId, userId, status, errorCode, createDate, updateDate,
    } = args;
    const payload = [
      id,
      cardId,
      userId,
      status,
      errorCode,
      createDate,
      updateDate,
    ];

    const { rows } = await db.query(card.createCard, payload);

    return camelCase(rows)[0];
  }

  static async findByUserId(id) {
    const { rows } = await db.query(card.findByUserId, [id]);
    return camelCase(rows)[0];
  }

  static async deleteCard(id) {
    const { rows } = await db.query(card.deleteCard, [id]);
    return camelCase(rows)[0];
  }

  static async pendingCards(pending) {
    const { rows } = await db.query(card.findPendingCards, [pending]);
    return camelCase(rows);
  }

  static async updateCards(id, newStatus, time) {
    const { rows } = await db.query(card.updateStatus, [id, newStatus, time]);
    return camelCase(rows)[0];
  }

  static async findByCardId(id) {
    const { rows } = await db.query(card.findByCardId, [id]);
    return camelCase(rows)[0];
  }
}

export default CardDB;
