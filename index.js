import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import blogRoutes from "./router/blogs.js";
import contactRoutes from "./router/contact.js";
import subscriptionRoutes from "./router/subscription.js";
import userRoutes from "./router/UserRoutes.js";
import { db_con } from "./constants.js";
import fileUpload from 'express-fileupload';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// Routes
app.get("/", (req, res) => {
  return res.send("Working");
});
app.use("/blogs", blogRoutes);
app.use("/user", userRoutes);
app.use("/contacts", contactRoutes);
app.use("/subscriptions", subscriptionRoutes);

// Database connection and server startup
mongoose.connect(db_con)
  .then(() => app.listen(port, () => console.log("Server is running")))
  .catch((err) => console.log(`Something went wrong. Error: ${err}`));

export default app;
