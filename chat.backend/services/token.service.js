import { sign, verify } from "../utils/token.util.js";

/**
 * 
 * @param {String} payload 
 * @param {String} expiresIn 
 * @param {String} secret 
 * @returns 
 */
export const generateToken = async (payload, expiresIn, secret) => {
  let token = await sign(payload, expiresIn, secret);
  return token;
};

export const verifyToken = async (token, secret) => {
  let check = await verify(token, secret);
  return check;
};
