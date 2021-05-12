import bcrypt from "bcrypt";
import { sha256 } from "js-sha256";

const generateHash = (salt, plain) => {
  const hash = sha256.hmac.create(salt);
  hash.update(plain);
  return hash.hex();
};

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return {
    salt,
    hash: generateHash(salt, password),
  };
};

const compareHash = (plain, hash, salt) => {
  const hashMatch = generateHash(salt, plain);
  return hash === hashMatch;
};

export default { hashPassword, compareHash };
