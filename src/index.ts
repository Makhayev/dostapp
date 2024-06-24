import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASS;
const host = process.env.MONGODB_HOST;
const dbName = process.env.MONGODB_DB;

const connectionString = `mongodb+srv://${user}:${password}@${host}/${dbName}`;
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "users" },
);

const User = mongoose.model("User", userSchema);

mongoose
  .connect(connectionString)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/get-users", (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).send("Failed to retrieve users");
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
