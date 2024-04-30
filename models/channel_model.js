import mongoose from "mongoose";
const ChannelSchema = new mongoose.Schema({
  name: { type: String },
});
export default mongoose.model("Channel", ChannelSchema);
