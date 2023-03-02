import User from "@pages/database/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import * as checks from "@pages/lib/server_checks";

export default async function handler(req, res) {
  const body = req.body;
  for (let key in body) {
    if (checks.isStringEmpty(body[key])) {
      res.status(400).json({ msg: `${key} cannot be empty` });
      return;
    }
    if (!checks.minMax(body[key], 5, 40)) {
      res.status(400).json({ msg: `${key} length must be between 5 and 40` });
      return;
    }
  }
  let user_data = await User.findOne({
    attributes: ["id", "password"],
    where: { email: body.email },
  });
  if (user_data === null) {
    res.status(400).json({ msg: "This email does not exist." });
  }
  let db_password = user_data.password;
  let pass_check = await bcrypt.compare(body.password, db_password);
  if (pass_check) {
    const accessToken = jwt.sign(
      { email: body.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10hr" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400).json({ msg: "Wrong Password." });
  }
}
