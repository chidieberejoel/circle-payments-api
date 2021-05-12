import { v4 as uuidv4 } from "uuid";
import { Hash, lowercase, camelCase } from "../utils";
import { db, user } from "../db";

class UserDB {
  static async createUser(args) {
    const id = uuidv4();
    const {
      firstName, lastName, email, password,
    } = args;
    const emailAddress = lowercase(email);
    const userFirstName = lowercase(firstName);
    const userLastName = lowercase(lastName);
    const hashedPassword = Hash.hashPassword(password);
    const { salt, hash } = hashedPassword;
    const payload = [
      id,
      emailAddress,
      userFirstName,
      userLastName,
      hash,
      salt,
    ];
    const { rows } = await db.query(user.createUser, payload);

    return camelCase(rows)[0];
  }

  static async getUserByEmail(email) {
    const { rows } = await db.query(user.findByEmail, [email]);
    return camelCase(rows)[0];
  }

  static async getUserById(id) {
    const { rows } = await db.query(user.findById, [id]);
    return camelCase(rows)[0];
  }

  static async updateUserLevel(id, newValue) {
    const { rows } = await db.query(user.updateLevel, [id, newValue]);
    return camelCase(rows)[0];
  }
}

export default UserDB;
