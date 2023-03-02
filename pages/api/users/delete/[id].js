import User from "@pages/database/models/user";

export default async function handler(req, res) {
  const id = req.query.id;
  let user_data = await User.destroy({
    where: { id: id },
  });
  res.status(200).json({
    msg: "user deleted!",
    // user_data
  });
}
