const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const port = 4091;

const app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bakery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connection successful');
});

// User schema for sign-in and login
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Order schema for cart submissions
const orderSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  food: String,
  how_much: Number,
  address: String,
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

// Routes

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve the signin page
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'Sign_in.html'));
});

// Handle user signup (POST request from signin.html)
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  try {
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

// Serve the cart page
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'cart.html'));
});

// Handle cart submissions (POST request from cart.html)
app.post('/submit-cart', async (req, res) => {
  const { first_name, last_name, email, phone, food, how_much, address } = req.body;

  if (!first_name || !last_name || !email || !phone || !food || !how_much || !address) {
    return res.status(400).send('All fields are required');
  }

  try {
    const newOrder = new Order({
      first_name,
      last_name,
      email,
      phone,
      food,
      how_much,
      address,
    });

    await newOrder.save();
    res.send('Order placed successfully');
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).send('Error placing order');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
