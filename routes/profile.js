const express = require('express');
const router = express.Router();
const fs=require('fs')
const voters=JSON.parse(fs.readFileSync('./data/data.json','utf8'))

router.get('/:id', (req, res) => {
    // Check if user is authenticated
    if (req.session.isLoggedIn) {
        // Render dashboard with user data
        res.render('layouts/mainLayout', { user: req.session.user, content: 'profile', isLoggedIn: req.session.isLoggedIn });
    } else {
        // Redirect to login page if not authenticated
        res.redirect('/auth/login');
    }
});

router.post('/update/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userToUpdate = voters.find((user) => user.id == userId);

        if (!userToUpdate) {
            return res.status(404).send("User not found");
        }

        userToUpdate.isAdmin = req.body.isadmin || userToUpdate.isAdmin;
        userToUpdate.isRegistered = req.body.isRegistered || userToUpdate.isRegistered;
        userToUpdate.name.first = req.body.firstName || userToUpdate.name.first;
        userToUpdate.name.last = req.body.lastName || userToUpdate.name.last;
        userToUpdate.age = req.body.age || userToUpdate.age;
        userToUpdate.gender = req.body.gender || userToUpdate.gender;
        userToUpdate.address.street = req.body.street || userToUpdate.address.street;
        userToUpdate.address.district = req.body.district || userToUpdate.address.district;
        userToUpdate.address.state = req.body.state || userToUpdate.address.state;
        userToUpdate.phone = req.body.phone || userToUpdate.phone;
        userToUpdate.email = req.body.email || userToUpdate.email;
        userToUpdate.profileImage = req.body.profileUrl || userToUpdate.profileImage;

        // Update session user data if necessary
        if (req.session.user && req.session.user.id === userId) {
            req.session.user = userToUpdate;
        }

        // Write the updated data back to the data.json file
        fs.writeFileSync('./data/data.json', JSON.stringify(voters, null, 2));

        res.redirect(`/profile/${userId}`);
    } catch (error) {
        res.status(500).json("Error", error.message);
    }
});
module.exports = router;
