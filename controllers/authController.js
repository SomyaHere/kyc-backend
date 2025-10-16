const User = require("../models/User");

const loginUser = async (req, res) => {
  console.log("Here is the query", req.body)
  try {
    const { mobile, relation } = req.body;

    if (!mobile || !relation) {
      return res.status(400).json({ message: "Mobile and relation are required" });
    }

    // Check if user exists
    let user = await User.findOne({ mobile });

    if (!user) {
      // Create new user if not found
      user = await User.create({ mobile, relation });
      return res.status(201).json({ message: "User created successfully", user });
    }

    // If exists, just send success
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    // logic to get user
    res.status(200).json({ success: true, user: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

 module.exports = {loginUser, getUser}