import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

import userRoute from "./route/user.route.js";

app.use(cors());
app.use(express.json());

import bookRoute from "./route/book.route.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.mongoDBURI;
//connect tomongoDB

try {
  mongoose.connect(URI);
  console.log("connected to mongoDB");
} catch (error) {
  console.log("Error", error);
}

app.get("/", (req, res) => {
  res.send("BookStore App");
});

//defining route
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
