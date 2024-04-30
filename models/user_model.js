import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  password: { type: String },
  gender: { type: String },
  avatar: { type: Number },
});
export default mongoose.model("User", UserSchema);
