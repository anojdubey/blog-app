import mongoose from "mongoose";
const Schema = mongoose.Schema;

const signupSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    required: true,
  },
});
export default mongoose.models.SignUp || mongoose.model("SignUp", signupSchema);
