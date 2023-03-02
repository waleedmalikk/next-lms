import User from "@pages/database/models/user";

export default async function handler(req, res) {
  const id = req.query.id;
  let user_data = await User.findOne({
    attributes: ["email", "username"],
    where: { id: id },
  });
  res.status(200).json(user_data);
}
