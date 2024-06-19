const express = require("express");
const router = express.Router();
const User = require("../models/user");
const usercontroller = require("../controller/usercontroller");

router.get("/userlist", usercontroller.getuser);

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error" + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.json(users);
  } catch (err) {
    res.status(500).send("Error" + err);
  }
});

router.post("/user", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phoneno: req.body.phoneno,
  });
  try {
    const u1 = await user.save();
    res.json(u1);
  } catch (err) {
    res.status(400).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const Patch = await User.findById(req.params.id);
    Patch.name = req.body.name;
    // Patch.email = req.body.email;
    // Patch.phoneno = req.body.phoneno;
    const p1 = await Patch.save();
    res.json(p1);
  } catch (err) {
    res.send("Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
});

module.exports = router;
