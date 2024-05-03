import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
  text: { type: String },
  sender: { type: mongoose.Types.ObjectId },
  channel: { type: mongoose.Types.ObjectId },
});
export default mongoose.model("Message", MessageSchema);
