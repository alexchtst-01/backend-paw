import User from "../models/UserModel.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getUserbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
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

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, email, name, gender, age } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "user tidak ditemukan" });
    }
    if (username) user.username = username;
    if (email) user.email = email;
    if (name) user.name = name;
    if (gender) user.gender = gender;
    if (age) user.age = age;
    // to do enscrypt the password
    if (password) user.password = password;
    const updatedUser = await user.save();
    res.status(202).json({ msg: updatedUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "user tidak ditemukan" });
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json({ msg: "data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
