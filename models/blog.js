import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  blog_title: { type: String, required: true },
  author: String,
  blog_intro: { type: String, required: false },
  blog_body: { type: String, required: false },
  blog_image: { type: String, required: false },
  blog_category: { type: String, required: false },
  blog_tags: { type: String, required: false },
  blog_is_featured: { type: Boolean, default: false },
  slug: String,
  read_time: String,
  publish_date: { type: Date, default: new Date() },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

var blog = mongoose.model("blog", blogSchema);

export default blog;
