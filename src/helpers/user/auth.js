import { Hash } from "../../utils";
import { User } from "../../services";

const auth = async (req) => {
  const {
    headers: { authorization },
  } = req;
  let bearerToken = null;
  if (authorization) {
    const token = authorization.split(" ")[1];
    bearerToken = token || authorization;
  }
  const token = bearerToken
    || req.headers["x-access-token"]
    || req.headers.token
    || req.body.token;
  try {
    const decoded = Hash.verifyToken(token);
    req.user = decoded;
    const getUser = User.getUserById(decoded.id);
    return getUser;
  } catch (err) {
    return null;
  }
};

export default auth;
