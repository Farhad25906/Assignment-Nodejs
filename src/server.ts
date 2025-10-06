import mongoose from "mongoose";
import config from "./config";
import routes from "./routes";
import app from "./app";

async function server() {
  try {
    await mongoose.connect(config.database_url!);
    app.listen(config.port, () => {
      console.log(`Server is Running at ${config.port}`);
    });
    console.log("Connected to Database 🚀");
  } catch (error) {
    console.error(`Server Error ${server}`);
  }
}

server();
