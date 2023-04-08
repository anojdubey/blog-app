import {
  addUser,
  getAllUserDetails,
} from "@/api-helper/controller/login-controller";
import { connectToDataBase } from "@/api-helper/utils";

export default async function handler(req, res) {
  connectToDataBase();
  if (req.method === "GET") {
    getAllUserDetails(req, res);
  } else if (req.method === "POST") {
    addUser(req, res);
  }
}
