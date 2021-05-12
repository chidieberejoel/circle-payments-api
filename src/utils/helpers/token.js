import jwt from "jsonwebtoken";
import config from "../../config";

const { secret } = config;
const generateToken = (payload, expiresIn = "3h") => jwt.sign(payload, secret, { expiresIn });

const verifyToken = (token) => jwt.verify(token, secret);

export default { generateToken, verifyToken };
