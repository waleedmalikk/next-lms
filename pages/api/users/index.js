import User from "@pages/database/models/user";

export default async function handler(req, res) {
  let users_list = await User.findAll({
    attributes: ["id", "email", "username"],
  });
  res.status(200).json(users_list);
}
