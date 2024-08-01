const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(session({
  secret: 'secret123',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

//view engine
app.set('view engine', 'ejs');

// Routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const profileRoute = require('./routes/profile')

app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/profile', profileRoute)

app.use((req, res, next) => {
  res.render('layouts/mainLayout', { content: 'pageNotFound', isLoggedIn: req.session.isLoggedIn });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
