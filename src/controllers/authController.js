import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(404).json({ msg: "user tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "password salah" });
    }

    const { _id, role, email: uname } = user;

    const token = jwt.sign(
      { id: _id, username: uname, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 10
    });

    return res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ msg: "Login failed: " + error.message });
  }
};
