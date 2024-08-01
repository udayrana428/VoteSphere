const express = require('express');
const router = express.Router();
const fs=require('fs')
const voters=JSON.parse(fs.readFileSync('./data/data.json','utf8'))

router.get('/', (req, res) => {
  if (req.session.isLoggedIn) {
    let userId = req.session.user.id
    let user = voters.find((elm => elm.id === userId))
    setTimeout(() => {
      if (user.isAdmin) {
        res.render('layouts/mainLayout', { user: req.session.userId, voters: voters, content: 'dashboard', isLoggedIn: req.session.isLoggedIn })
      }
      else {
        res.render('layouts/mainLayout', { content: 'profile', user: req.session.user, isLoggedIn: req.session.isLoggedIn })
      }  
    }, 500);
    
  }
  else {
    res.render('layouts/mainLayout', { content: 'index', isLoggedIn: req.session.isLoggedIn });
  }
});

module.exports = router;
