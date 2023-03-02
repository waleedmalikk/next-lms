import * as jose from "jose";
// import * as dotenv from "dotenv";
// dotenv.config();

export const verifyToken = async (token) => {
  const secret = new TextEncoder().encode("THIS IS MY KEY");
  const { payload } = await jose.jwtVerify(token, secret);
  return payload;
};
