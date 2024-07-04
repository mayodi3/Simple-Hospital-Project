import dotenv from "dotenv";
import { connect } from "mongoose";
import { app } from "./index.js";

dotenv.config();
const PORT = process.env.PORT;
const URI = process.env.URI;

export default function connectToDBAndServer() {
  connect(URI)
    .then(() => {
      console.log("Connected to MongoDB...");
    })
    .then(() =>
      app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}...`);
      })
    )
    .catch((error) => {
      console.error(error);
    });
}
