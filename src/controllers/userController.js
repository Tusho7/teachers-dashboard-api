import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendVerificationEmail, { sendEmail } from "../utils/emailVerification.js";
import { v4 as uuidv4 } from 'uuid'

const generateUniqueCode = () => {
  return uuidv4();
}

const generateNewPssword = () => {
  return Math.random().toString(36).slice(-8);
}

export const registerUser = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = generateUniqueCode();

    const newUser = new User({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      verificationCode,
    });

    await newUser.save();

    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, verificationCode } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !user.isVerified) {
      return res.status(401).json({ message: 'User not found or not verified' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

      const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: true,
    });

    res.status(200).json({ id: user.id });

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true, 
      sameSite: "none",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req,res) => {
  const { id } = req.params;
  const { email, password, first_name, last_name } = req.body;

  try {
    let user = await User.findByPk(id);

    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(email) {
      user.email = email;
    }

    if(first_name){
      user.first_name = first_name;
    }

    if(last_name){
      user.last_name = last_name;
    }

    if(password){
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const verifyUser = async (req, res) => {
  const { email, verificationCode } = req.query;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (verificationCode !== user.verificationCode) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'User verified successfully' });
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if(!user){ 
      return res.status(404).json({ message: "User not found" });
    }

    const newPassword = generateNewPssword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    await sendEmail(email, "Password reset", `Your new password is: ${newPassword}`);

    return res.status(200).json({ message: "Password reset successfully. Check your email for the new password." });
  } catch(error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }

}