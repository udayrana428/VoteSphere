const express = require('express');
const router = express.Router();
const voters = require("../data/voters")

router.get('/:id', (req, res) => {
    // const userInfo = voters.filter((elm) => {
    //     if (elm.id == req.params.id) {
    //         return elm;
    //     }
    // });
    // if (!userInfo) {
    //     // If user with the provided ID is not found
    //     return res.status(404).send('User not found');
    // }
    // console.log(userInfo)
    // Check if user is authenticated
    if (req.session.isLoggedIn) {
        // Render dashboard with user data
        res.render('layouts/mainLayout', { user: req.session.user, content: 'profile' });
    } else {
        // Redirect to login page if not authenticated
        res.redirect('/auth/login');
    }
});

router.post('/update/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const userToUpdate = voters.find((user) =>  user.id == userId )

        if (!userToUpdate) {
            return res.status(404).send("User not found")
        }

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

        const newUser=voters.find(user=> user.id===userId)
        req.session.user=newUser

        // res.status(200).send("Successfully Updated Profile")
        res.redirect(`/profile/${userId}`)
    } catch (error) {
        res.status(500).json("Error", error.message)
    }
})
module.exports = router;
