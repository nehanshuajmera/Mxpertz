import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";

/* configuring enviroment variables */
config();

/* Loading enviroment variables */
const PORT = process.env.PORT;
const MDB_CONNECT = process.env.MDB_CONNECT;

/* creating express app */
const app = express();

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(cors());

/* routes */
app.get("/", (req, res) => {
  res.status(200).json(`Backend Working, Happy Coding!!`);
})

/* connecting to mongodb */
const connect = async () => {
  try {
    await mongoose.connect(MDB_CONNECT);
    console.log(`Connected to MongoDB`);

    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
  }
};

/* Invoking Connection to database */
connect();

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({message: err.message});
});