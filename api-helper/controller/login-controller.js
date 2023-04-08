import SignUp from "../model/SignUp";
import { setCookies } from "cookies-next";

export const getAllUserDetails = async (req, res) => {
  let signup;
  try {
    signup = await SignUp.find();
  } catch (err) {
    return new Error(err);
  }

  if (!signup) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
  if (signup.length === 0) {
    return res.status(404).json({ message: "No Data Found" });
  }
  return res.status(200).json({ signup });
};

export const addUser = async (req, res) => {
  const { username, password, access } = req.body;
  let user = await SignUp.findOne({ username: username });
  // console.log(req.body.username);
  // console.log(user.username);
  let signup;
  if (!req.body.username || !password || !access) {
    return res.status(422).json({ message: "Enter Valid Inputs" });
  }
  if (username === user?.username) {
    return res.status(400).json({ message: "User Already Exsists" });
  }
  try {
    signup = new SignUp({ username, password, access });
    signup = await signup.save();
  } catch (err) {
    return new Error(err);
  }
  if (!signup) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
  return res.status(201).json({ signup });
};
export const getUserDetails = async (req, res) => {
  const id = req.query.id;

  let signup;
  try {
    signup = await SignUp.findById(id);
  } catch (err) {
    return new Error(err);
  }

  if (!signup) {
    return res.status(500).json("Internal Server Error");
  }
  return res.status(200).json({ signup });
};

export const getLoginUser = async (req, res) => {
  const { username, password } = req.body;
  let user = await SignUp.findOne({ username: username });
  console.log(user);
  if (user) {
    if (user.length === 0) {
      return res.status(404).json("No User Found");
    } else if (user.username === username && user.password === password) {
      setCookies("username", username, { req, res, maxAge: 60 * 6 * 24 });
      setCookies("access", user.access, { req, res, maxAge: 60 * 6 * 24 });
      return res.status(200).json({
        success: "success",
        username: user.username,
        access: user.access,
      });
    }
  }
  return res.status(500).json("Internal Server Error");
};
