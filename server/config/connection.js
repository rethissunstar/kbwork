import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kbfanatics-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose.connection;
