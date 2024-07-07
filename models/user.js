import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  // full_name: { type: String, required: fase },
  email: { type: String, required: true },
  userName: { type: String, required: false },
  password: { type: String, required: false },
  // phoneNumber : { type: String, required: false },
  // password: { type: String, required: false },
  // bio : { type: String, required: false },
  // profileImage : { type: String, required: false },
  // id: { type: String },
});


var userModal = mongoose.model("user" , userSchema);
export default userModal;