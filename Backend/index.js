import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "./Backend/Models/userModel.js";
import { foodModel } from "./Backend/Models/foodModels.js";
import { verifyToken } from "./verifyToken.js";
import { trackingModel } from "./Backend/Models/trackingModel.js";
mongoose
  .connect("mongodb://127.0.0.1:27017/Nutrify")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

// Creating Endpoint for registering user
app.post("/register", (req, res) => {
  let user = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(user.password, salt, async (err, hpass) => {
        if (!err) {
          user.password = hpass;
          try {
            let doc = await userModel.create(user);
            res.status(201).send(doc);
          } catch (error) {
            console.log(err);
            res.status(500).send({ message: "Some Problem" });
          }
        } else {
          res.send("Password didnt encrypted");
        }
      });
    }
  });
});

// EndPoint for login

app.post("/login", async (req, res) => {
  let userDetails = req.body;

  try {
    const user = await userModel.findOne({ email: userDetails.email });
    if (user !== null) {
      bcrypt.compare(userDetails.password, user.password, (err, result) => {
        if (!err) {
          jwt.sign({ email: userDetails.email }, "aditya", (err, token) => {
            if (!err) {
              res.send({ token });
            } else {
              res.send({ message: "Some Problem" });
            }
          });
        }
      });
    } else {
      res.status(404).send({ Message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Create post request to add the food item into the database

app.post("/food", verifyToken, (req, res) => {
  let food = req.body;
  foodModel
    .create(food)
    .then((data) => {
      console.log("Food added");
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});
// Get all food

app.get("/menu", verifyToken, async (req, res) => {
  try {
    let foods = await foodModel.find();
    res.status(200).send(foods);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some Problem occured" });
  }
});

// Search food by name

app.get("/menu/:name", verifyToken, async (req, res) => {
  let name = { $regex: req.params.name, $options: "i" };
  console.log(name);
  try {
    let food = await foodModel.find({ name });
    if (food !== null) {
      res.send(food);
    } else {
      res.status(403).send({ message: "Food Not found" });
    }
  } catch (error) {
    console.log(err);
    res.status(500).send({ message: "Some Problem" });
  }
});

// endpoint to track a food

app.post("/track", verifyToken, async (req, res) => {
  let trackData = req.body;
  try {
    let data = await trackingModel.create(trackData);
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some Problem in adding food" });
  }
});
// Show my tracked food
// endpoint to fetch all foods eaten by a person

app.get("/track/:userId/:date", verifyToken, async (req, res) => {
  let userId = req.params.userId;
  let eatenDate = new Date(req.params.date).toLocaleDateString();
  console.log(eatenDate);
  try {
    let foods = await trackingModel
      .find({ userId, eatenDate })
      .populate("userId")
      .populate("foodId");
    res.send(foods);
  } catch (error) {
    res.status(500).send({ message: "Some Problem in adding food" });
  }
});

app.listen(8080, () => {
  console.log("Server is up and running!!!");
});
