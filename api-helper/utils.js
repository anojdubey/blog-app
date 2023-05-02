import mongoose from "mongoose";

export const connectToDataBase = async () => {
  // if (mongoose.connections[0]) {
  //   return;
  // }
  mongoose
    .connect(
      "mongodb+srv://anojadubey:i1ZKsnHC8LMi1JcC@cluster0.wgbyjmm.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected"))
    .catch((err) => console.log(err));
};
