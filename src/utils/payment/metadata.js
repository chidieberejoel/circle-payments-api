import { sha256 } from "js-sha256";

const getMetadata = (req) => {
  const ipAddress = req.ip
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || req.connection.socket.remoteAddress
    || req.headers["X-Forwarded-For"].split(",")[0];

  // Since we use jwt not sessions, we assume an ID from the user's JWT
  const sessionId = sha256(req.headers.authorization).slice(0, 49);

  const { email } = req.user;

  return { email, sessionId, ipAddress };
};

export default getMetadata;
