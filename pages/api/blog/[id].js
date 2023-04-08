import {
  deleteBlog,
  getBlogbyId,
  updateBlog,
} from "@/api-helper/controller/blog-controller";
import { connectToDataBase } from "@/api-helper/utils";

export default async function handler(req, res) {
  await connectToDataBase();
  if (req.method === "GET") {
    return getBlogbyId(req, res);
  } else if (req.method === "PUT") {
    return updateBlog(req, res);
  } else if (req.method === "DELETE") {
    return deleteBlog(req, res);
  }
}
