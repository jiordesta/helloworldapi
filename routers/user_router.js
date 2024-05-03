import { Router } from "express";
import {
  fetchuser,
  signin,
  signout,
  signup,
} from "../controllers/user_controller.js";
import { upload } from "../utilities/multer.js";
import { validate_signin, validate_signup } from "../middlewares/validator.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = new Router();

router.route("/signup").post(upload.single(""), validate_signup, signup);
router.route("/signin").post(upload.single(""), validate_signin, signin);
router.route("/signout").post(signout);
router.route("/fetchuser").get(authenticate, fetchuser);

export default router;
