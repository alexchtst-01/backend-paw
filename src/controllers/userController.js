import User from "../models/UserModel.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ msg: "data berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msh: error.message });
  }
};
