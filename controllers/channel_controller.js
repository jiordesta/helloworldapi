import { StatusCodes } from "http-status-codes";
import Channel from "../models/channel_model.js";
import { BadRequestError } from "../utilities/custom_errors.js";

export const create_channel = async (req, res) => {
  const { name } = req.body;
  const channel = await Channel.create({ name });
  if (!channel) throw new BadRequestError("Error Creating a new Channel");
  return res.status(StatusCodes.OK).json({ channel });
};
