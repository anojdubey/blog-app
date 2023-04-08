import { addBlogs, getAllBlogs } from "@/api-helper/controller/blog-controller";
import { connectToDataBase } from "@/api-helper/utils";

export default async function handler(req, res) {
  await connectToDataBase();

  if (req.method === "GET") {
    getAllBlogs(req, res);
  } else if (req.method === "POST") {
    addBlogs(req, res);
  }
}
