import { StatusCodes } from "http-status-codes";
import User from "../models/user_model.js";
import { comparePassword, hashPassword } from "../utilities/password.js";
import { BadRequestError } from "../utilities/custom_errors.js";
import { createJWT } from "../utilities/Token.js";

export const signup = async (req, res) => {
  const { name, username, password, gender, avatar } = req.body;
  const user = await User.create({
    name,
    username: username.toLowerCase(),
    password: await hashPassword(password),
    gender,
    avatar,
  });
  if (!user)
    throw new BadRequestError("There was an error creating your account");
  res.status(StatusCodes.OK).json("");
};

export const signin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) throw new BadRequestError(`Username "${username}" does not exist`);
  if (!(await comparePassword(password, user.password)))
    throw new BadRequestError("Wrong password");
  const token = createJWT({ _id: user._id });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: false,
    sameSite: "Lax", //None for production Lax for development
  });
  res.status(StatusCodes.OK).json("");
};

export const fetchuser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new BadRequestError("Invalid Token");
  res.status(StatusCodes.OK).json({ user });
};

export const signout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: false,
    sameSite: "Lax", //None for production Lax for development
  });
  res.status(StatusCodes.OK).json("Logged out");
};
