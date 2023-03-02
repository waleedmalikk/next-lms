import User from "@pages/database/models/user";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();
import * as checks from "@pages/lib/server_checks";

export default async function handler(req, res) {
  console.log("herrrrrrrrrrrrrrrrrrrrrrr");
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

  const duplicate_email = await User.findOne({ where: { email: body.email } });

  if (duplicate_email !== null) {
    res.status(400).json({ msg: ` Email: "${body.email}" already exists.` });
  }

  let hashed_password = await bcrypt.hash(
    body.password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const add_user = await User.create({
    username: body.username,
    email: body.email,
    password: hashed_password,
  });

  res.status(200).json({ msg: `New User Id:${add_user.id}` });
}
