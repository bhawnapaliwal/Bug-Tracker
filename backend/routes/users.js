const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res) => {
    User.find()//mongoose method that gets the list of all the users in the mongoDb database
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const newUser = new User({username}); //doubt: why curly braces

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;