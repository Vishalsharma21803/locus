import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/Product.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Canteen Order System API");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
