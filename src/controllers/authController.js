import User from "../models/UserModel.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await User.findOne({ username: username });
    if (!existUser) {
      return res.status(404).json({ msg: userNotfound });
    }
    if (existUser.password === password) {
      req.alloowed = true;
      console.log("berhasil login");
      return res.status(200).json({msg: "berhasil masuk"})
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
