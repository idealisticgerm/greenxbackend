import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { UserModel } from "../models/User.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // ** validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }

    // ** check user
    const existingUser = await UserModel.findOne({ email });
    // ** existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered Please login !",
      });
    }

    // **register user
    const hashedPassword = await hashPassword(password);
    // ** save
    const user = await new UserModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    // ** send response
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration of user",
      error,
    });
  }
};

// ** LOGIN CONTROLLER
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ** validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    // ** check user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password!",
      });
    }

    // ** token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login !",
      error,
    });
  }
};

// ** TEST CONTROLLER

export const testController = (req, res) => {
  try {
    res.send("protected route");
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};
