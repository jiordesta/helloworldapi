import { Router } from "express";
import { upload } from "../utilities/multer.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  create_message,
  fetch_messages,
} from "../controllers/message_controller.js";

const router = new Router();

router
  .route("/create_message")
  .post(upload.single(""), authenticate, create_message);
router
  .route("/fetch_messages")
  .get(upload.single(""), authenticate, fetch_messages);

export default router;
