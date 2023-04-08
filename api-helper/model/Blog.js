import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  content: {
    type: String,
  },
  images: {
    type: String,
  },
  comments: [
    {
      username: String,
      desc: String,
    },
  ],
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
