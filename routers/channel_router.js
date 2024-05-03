import { Router } from "express";
import { create_channel } from "../controllers/channel_controller.js";
import { upload } from "../utilities/multer.js";

const router = new Router();

router.route("/create_channel").post(upload.single(""), create_channel);

export default router;
