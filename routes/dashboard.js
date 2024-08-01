const express = require('express');
const router = express.Router();
const fs=require('fs')
const voters=JSON.parse(fs.readFileSync('./data/data.json','utf8'))

// Dashboard route
router.get('/', (req, res) => {
  // Check if user is authenticated
  if (req.session.user) {
    // Render dashboard with user data
    res.render('layouts/mainLayout', { user: req.session.user, voters: voters, content: 'dashboard', isLoggedIn: req.session.isLoggedIn});
  } else {
    // Redirect to login page if not authenticated
    res.redirect('/auth/login');
  }
});

module.exports = router;
