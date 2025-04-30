import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./helper/connectDB.js";
import { connectCloudinary } from "./helper/cloudinary.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.router.js";

dotenv.config();

// APP config
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

// Listening
app.listen(process.env.PORT || 4000, async () => {
  await connectDB();
  await connectCloudinary();
  console.log(
    `Server is running on port http://localhost:${process.env.PORT || 4000}`
  );
});
