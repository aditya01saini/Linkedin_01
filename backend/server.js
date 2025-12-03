import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(postRoutes);

app.use(express.json());

const start = async () => {
  const connectDB = await mongoose.connect(
    "mongodb+srv://adityasaini:adityalinkedin01@linkedincluster.66exxg7.mongodb.net/?appName=linkedinCluster"
  );
  app.listen(9090, () => {
    console.log("server is running on port 9090");
  });
};

start(); 