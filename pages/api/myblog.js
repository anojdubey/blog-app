import { getBlogByName } from "@/api-helper/controller/blog-controller";
import { connectToDataBase } from "@/api-helper/utils";

export default async function handler(req, res) {
  connectToDataBase();
  if (req.method === "POST") {
    getBlogByName(req, res);
  }
}
