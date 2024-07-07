import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModal from "../models/user.js";

const secret = "careergateway";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await userModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "24h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const oldUser = await userModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModal.create({
      email,
      password: hashedPassword,
      userName: userName,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "24h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const changePassword = async (req, res) => {
    try {
      const { email, oldPassword, newPassword } = req.body;
  
      const user = await userModal.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isCorrectPassword) { 
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await userModal.findOneAndUpdate({ email }, { password: hashedPassword });
  
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  