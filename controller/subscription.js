import subscription from "../models/subscription.js";

// Create a new subscription
export const createSubscription = async (req, res) => {
  try {
    const { subscription_title, first_name, last_name, email, status } = req.body;

    const newSubscription = new subscription({
      subscription_title,
      first_name,
      last_name,
      email,
      status,
      created_at: new Date(),
    });

    await newSubscription.save();
    res.status(201).json({ message: "Subscription created successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

// Get all subscriptions
export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscription.find().sort({ created_at: -1 });
    res.status(200).json({ data: subscriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get subscription by ID
export const getSubscriptionById = async (req, res) => {
  try {
    const id = req.params.id;
    const _subscription = await subscription.findById(id);
    if (!_subscription) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Success", payload: _subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
