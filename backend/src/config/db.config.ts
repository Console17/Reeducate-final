import mongoose from "mongoose";
import "dotenv/config";

export default async () => {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL required");
  }
  try {
    await mongoose.connect(mongoUrl);
    console.log("successfully connected to DB");
  } catch (e) {
    console.log("couldn't connect to DB", e);
  }
};
