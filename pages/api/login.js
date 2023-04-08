import { getLoginUser } from "@/api-helper/controller/login-controller";
import { connectToDataBase } from "@/api-helper/utils";

export default async function handler(req, res) {
  connectToDataBase();
  if (req.method === "POST") {
    getLoginUser(req, res);
  }
}
