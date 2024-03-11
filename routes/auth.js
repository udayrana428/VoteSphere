const express = require('express');
const router = express.Router();
const fs= require('fs')

// import voters from '../data/voters';
const voters = require("../data/voters")

// Login route
router.get('/login', (req, res) => {
  res.render('layouts/mainLayout', { content: 'login' });
});

// Register route
router.get('/register', (req, res) => {
  res.render('layouts/mainLayout', { content: 'register' });
});

// Logout route
router.get('/logout', (req, res)=>{
  req.session.isLoggedIn=false
  res.redirect('/')
})

// Handle login form submission
router.post('/login', (req, res) => {
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;

  const user = voters.find(elm => elm.email === inputEmail && elm.password === inputPassword);
  if (!user) {
      // If user credentials are invalid
      return res.status(401).send('Invalid email or password');
  }

  // Set session variables
  req.session.user=user
  req.session.isLoggedIn = true;
  // req.session.userId = user.id;

  if (user.isAdmin) {
      // If user is an admin, redirect to dashboard
      res.redirect('/dashboard');
  } else {
      // If user is not an admin, redirect to their profile
      res.redirect(`/profile/${user.id}`);
  }
});

// Handle registration form submission
router.post('/register', async (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;

  // Create a new address object
  const newAddress = {
      street: req.body.street || "",
      district: req.body.district || "",
      state: req.body.state || "",
  };

  // Create a new voter object
  const newVoter = {
      id: voters.length + 1, // Generate a unique ID for the new voter
      name: {
          first: firstName,
          last: lastName,
      },
      age: req.body.age || "",
      gender: req.body.gender || "",
      address: newAddress, // Use the new address object
      phone: req.body.phone || "",
      email: email,
      password: password,
      profileImage: req.body.profileImage || "" // Assuming you're sending profile image URL in the request
  };

  // Add the new voter to the voters array
  voters.push(newVoter);

  // Optionally, you can send a response indicating successful registration
  res.status(201).json({ message: 'Registration successful', voter: newVoter });
  res.redirect('/auth/login')
});


module.exports = router;
