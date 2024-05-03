import { StatusCodes } from "http-status-codes";
import Message from "../models/message_model.js";
import { BadRequestError } from "../utilities/custom_errors.js";

export const create_message = async (req, res) => {
  const { text, channel } = req.body;
  const { _id } = req.user;
  const message = await Message.create({ text, sender: _id, channel });
  if (!message)
    throw new BadRequestError("An Error Occured Sending the message");
  res.status(StatusCodes.OK).json({ message });
};

export const fetch_messages = async (req, res) => {
  const { channel } = req.body;
  const messages = await Message.find({ channel: "6634640acfe51d5ec7e147c6" });
  if (!messages) throw new BadRequestError("An Error Occured!");
  res.status(StatusCodes.OK).json({ messages });
};
