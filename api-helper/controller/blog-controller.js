import Blog from "../model/Blog";

export const getAllBlogs = async (req, res) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return new Error(err);
  }

  if (!blogs) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
  if (blogs.length === 0) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

export const addBlogs = async (req, res) => {
  const { title, author, content, images, comments } = req.body;
  console.log(req.body);
  // if (!title) {
  //   return res.status(422).json({ message: "Enter Valid Inputs" });
  // }

  let blog;

  try {
    blog = new Blog({ title, author, content, images, comments });
    blog = await blog.save();
  } catch (err) {
    return new Error(err);
  }

  if (!blog) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
  return res.status(201).json({ blog });
};

export const updateBlog = async (req, res) => {
  const id = req.query.id;
  const { title, author, content, images, comments } = req.body;
  console.log(req.body);
  // if (!title && title.trim() === "") {
  //   return req.status(422).json({ message: "Enter Valid Inputs" });
  // }

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(id, {
      title,
      author,
      content,
      images,
      comments,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(500).json("Internal Server Error");
  }
  return res.status(200).json("Successfully UPdated");
};

export const getBlogbyId = async (req, res) => {
  const id = req.query.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return new Error(err);
  }
  if (!blog) {
    return res.status(500).json("Internal Server Error");
  }
  if (blog.length === 0) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blog });
};

export const getBlogByName = async (req, res) => {
  const { username } = req.body;
  console.log(req.body);
  let blog;
  try {
    blog = await Blog.find({ author: username });
    console.log(blog);
  } catch (err) {
    return new Error(err);
  }
  if (!blog) {
    return res.status(500).json("Internal Server Error");
  }
  if (blog.length === 0) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res) => {
  const id = req.query.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id);
  } catch (err) {
    return new Error(err);
  }

  if (!blog) {
    return res.status(500).json("Internal Server Error");
  }
  return res.status(200).json("Successfully Deleted");
};
