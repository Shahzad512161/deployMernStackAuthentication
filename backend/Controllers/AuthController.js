const UserModel = require('../Models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password securely

    const newUser = new UserModel({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful', success: true });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) { // Handle duplicate key error (assuming unique email)
      return res.status(409).json({ message: 'duplicate key error', success: false });
    }
    // Handle other potential errors here (e.g., validation errors)
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};



//login controller
// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: 'Authentication failed. Email or password is incorrect.', success: false });
    }

    // Compare passwords
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: 'Authentication failed. Email or password is incorrect.', success: false });
    }

    // Generate JWT token
    const jwtoken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET, // Ensure JWT_SECRET is correctly set in your .env file
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      success: true,
      jwtoken,
      email: user.email,
      name: user.username, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};


module.exports = {
  signup,
  login
};