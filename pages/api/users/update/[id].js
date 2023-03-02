import User from "@pages/database/models/user";
import * as checks from "@pages/lib/server_checks";

export default async function handler(req, res) {
  const id = req.query.id;
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
  let user_data = await User.update(
    { email: body.email, username: body.username },
    {
      where: { id: id },
    }
  );
  res.status(200).json({ msg: "user updated!", user_data });
}
