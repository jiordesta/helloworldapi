import { body, validationResult } from "express-validator";
import { BadRequestError } from "../utilities/custom_errors.js";
import User from "../models/user_model.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validate_signup = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("username")
    .notEmpty()
    .withMessage("Username is Required")
    .custom(async (username) => {
      const user = await User.findOne({ username: username.toLowerCase() });
      if (user) throw new BadRequestError(`${username} is already taken`);
    }),
  body("password").notEmpty().withMessage("Password is required"),
  body("gender").notEmpty().withMessage("Gender is Required"),
  body("avatar").notEmpty().withMessage("Avatar is Required!"),
]);

export const validate_signin = withValidationErrors([
  body("password").notEmpty().withMessage("Password is required"),
  body("username").notEmpty().withMessage("Username is Required"),
]);
