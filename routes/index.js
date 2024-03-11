const express = require('express');
const router = express.Router();
const voters = require('../data/voters')

router.get('/', (req, res) => {
  if (req.session.isLoggedIn) {
    let userId = req.session.user.id
    let user = voters.find((elm => elm.id === userId))
    // const userInfo = voters.filter((elm) => {
    //   if (elm.id == req.params.id) {
    //     return elm;
    //   }
    // });
    if (user.isAdmin) {
      res.render('layouts/mainLayout', { user: req.session.userId, voters: voters, content: 'dashboard' })
    }
    else {
      res.render('layouts/mainLayout', { content: 'profile', user: req.session.user })
    }
  }
  else {
    res.render('layouts/mainLayout', { content: 'index' });
  }
});

module.exports = router;
