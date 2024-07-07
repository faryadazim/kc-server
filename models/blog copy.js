import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
  subscription_title: { type: String, required: true },
  first_name: String,
  last_name: String,
  email: String,
  status: { type: Boolean, default: false },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

var subscription = mongoose.model("subscription", subscriptionSchema);

export default subscription;
