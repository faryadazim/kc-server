import blog from "../models/blog.js";
import { v2 as cloudinary, uploader } from "cloudinary";

import { capitalizeFirstLetter, parseDateString } from "../utility.js";
import slugify from "slugify";

cloudinary.config({
  cloud_name: "dxvec7whr",
  api_key: "487897429983127",
  api_secret: "XQK_--G2tGnzLA0uMzq1owaS0S8",
});

export const postblog = async (req, res) => {
  try {
    const {
      blog_title,
      author,
      blog_intro,
      blog_body,
      blog_category,
      blog_tags,
      slug,
      publish_date,
    } = req.body;

    let blog_image = "";

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    if (req.files && req.files.image) {
      const image = req.files.image;
      const { url } = await uploader.upload(image.tempFilePath, options);
      blog_image = url;
    }

    const slugGenerated = slug || await generateUniqueSlug(blog_title);

    const blogModel = new blog({
      blog_title,
      author,
      blog_intro,
      blog_body,
      blog_category,
      blog_tags,
      slug: slugGenerated,
      publish_date,
      blog_image,
      created_at: new Date(),
    });

    await blogModel.save();
    res.status(200).json({ message: "Post successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const getblogs = async (req, res) => {
  try {
    const { size = 10, page = 1, category = "-1", search = "-1" } = req.query;

    let query = {};
    if (category !== "-1") query.blog_category = category;

    if (search !== "-1") {
      query.$or = [
        { blog_title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { blog_intro: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await blog
      .find(query)
      .select("blog_title blog_intro blog_category blog_image slug")
      .sort({ created_at: -1 })
      .skip((page - 1) * size)
      .limit(parseInt(size));
    const total_record = await blog.countDocuments(query);

    res.status(200).json({ data: blogs, total_record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllblogs = async (req, res) => {
  try {
    const blogs = await blog.find().select("blog_title author blog_category");

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLatestblogs = async (req, res) => {
  try {
    const blogs = await blog
      .find()
      .select("blog_title blog_intro slug")
      .sort({ created_at: -1 })
      .skip(0)
      .limit(12);

    res.status(200).json({ payload: blogs });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getblogById = async (req, res) => {
  try {
    const id = req.params.id;
    const _blog = await blog.findById(id);
    if (!_blog) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Success", payload: _blog });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getblogBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const _blog = await blog.findOne({ slug });
    if (!_blog) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Success", payload: _blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteblogs = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await blog.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Blog deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const generateUniqueSlug = async (blogTitle) => {
  let slug = slugify(blogTitle, { lower: true, strict: true });
  let blogWithSameSlug = await blog.findOne({ slug });
  let uniqueSlug = slug;

  while (blogWithSameSlug) {
    uniqueSlug = slug + "-" + Math.random().toString(36).substr(2, 9);
    blogWithSameSlug = await blog.findOne({ slug: uniqueSlug });
  }

  return uniqueSlug;
};

