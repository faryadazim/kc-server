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
      blog_name,
      post_name,
      gender,
      department,
      company_name,
      tags,
      age_limit,
      apply_procedure,
      is_apply_link,
      apply_link,
      is_form_available,
      form_availableLink,
      domicile,
      vacancies,
      last_date,
      join_whatsapp_group,
      description_1,
      description_2,
      is_how_to_apply,
      how_to_apply,
      location1,
      location2,
      salary,
      type,
      education,
      procedure,
      category,
    } = req.body;
    const imagesUrls = {}; // Initialize an object to store image URLs

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    // Loop through the images in req.files
    for (let i = 1; i <= 10; i++) {
      const fileKey = `image${i}`;
      const fileKeyStore = `image_${i}`;

      if (req.files && req.files[fileKey]) {
        const image = req.files[fileKey];
        const { url } = await uploader.upload(image.tempFilePath, options);
        imagesUrls[fileKeyStore] = url;
      }
    }

    const blogType = capitalizeFirstLetter(type);

    var last_date_ = parseDateString(last_date);
    const blogModel = new blog({
      blog_name,
      post_name,
      gender,
      department,
      company_name,
      tags,
      age_limit,
      apply_procedure,
      is_apply_link,
      apply_link,
      is_form_available,
      form_availableLink,
      domicile,
      vacancies,
      last_date: last_date_,
      join_whatsapp_group,
      description_1,
      description_2,
      is_how_to_apply,
      how_to_apply,
      ...imagesUrls, // Spread the imagesUrls object to include all image URLs
      location1,
      location2,
      salary,
      blogType,
      education,
      procedure,
      category,
      slug: await generateUniqueSlug(blog_name),
    });

    await blogModel.save();
    res.status(200).json({ message: "Post successfully" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
export const getblogs = async (req, res) => {
  try {
    const { size, page, type, category = "-1", search = "-1" } = req.query;

    let query = {};
    if (category !== "-1") query.department = category;
    if (type !== "All") query.type = type;

    if (search !== "-1") {
      query.$or = [
        { blog_name: { $regex: search, $options: "i" } },
        { post_name: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await blog
      .find(query)
      .select("blog_name type last_date department location1 location2 salary slug")
      .sort({ createdAt: -1 })
      .skip((page - 1) * size)
      .limit(size);
    const total_record = await blog.countDocuments(query);

    res.status(200).json({ data: blogs, total_record });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllblogs = async (req, res) => {
  try {
    const blogs = await blog.find().select("blog_name type last_date department");

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLatestblogs = async (req, res) => {
  try {
    const blogs = await blog
      .find()
      .select("blog_name last_date slug")
      .sort({ createdAt: -1 })
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
    const _blog = await blog.findOne({ slug: slug });
    if (!_blog) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Success", payload: _blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteblogs = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await blog.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "blog deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const generateUniqueSlug = async (blogName) => {
  let slug = slugify(blogName, { lower: true, strict: true });
  let blogWithSameSlug = await blog.findOne({ slug: slug });
  let uniqueSlug = slug;

  while (blogWithSameSlug) {
    uniqueSlug = slug + "-" + Math.random().toString(36).substr(2, 9);
    blogWithSameSlug = await blog.findOne({ slug: uniqueSlug });
  }

  return uniqueSlug;
};
