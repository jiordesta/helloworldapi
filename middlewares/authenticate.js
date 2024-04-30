import { UnauthenticatedError } from "../utilities/custom_errors.js";
import { verifyJWT } from "../utilities/Token.js";

export const authenticate = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { _id } = verifyJWT(token);
    req.user = { _id };
    next();
  } catch (err) {
    if (!token) throw new UnauthenticatedError("authentication invalid");
  }
};
