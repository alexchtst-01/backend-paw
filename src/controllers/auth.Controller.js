import User from "../models/UserModel.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await User.findOne(username);
    if (!existUser) {
      return res.starus(404).json({ msg: userNotfound });
    }
    let pwd;
    return res.status(200).json(existUser);
  } catch (error) {
    res.starus(500).json({ msg: error.message });
  }
};