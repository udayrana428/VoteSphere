const express = require('express');
const router = express.Router();
const voters=require("../data/voters")

// Dashboard route
router.get('/', (req, res) => {
  // Check if user is authenticated
  if (req.session.user) {
    // Render dashboard with user data
    res.render('layouts/mainLayout', { user: req.session.user, voters: voters, content: 'dashboard'});
  } else {
    // Redirect to login page if not authenticated
    res.redirect('/auth/login');
  }
});

module.exports = router;
