import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  contact_title: { type: String, required: true },
  first_name: String,
  last_name: String,
  email: String,
  message: String,
  created_at: {
    type: Date,
    default: new Date(),
  },
});

var contact = mongoose.model("contact", contactSchema);

export default contact;
