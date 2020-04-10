const router = require('express').Router();
let Bug = require('../models/bug.model');

router.route('/').get((req,res) => {
    Bug.find()
        .then(bugs => res.json(bugs))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const status = req.body.status;
    const date = Date(req.body.date);

    const newBug = new Bug({
        username,
        description,
        status,
        date,
    });

    newBug.save()
        .then(() => res.json('Bug added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Bug.findById(req.params.id)//finding id from url
    .then(bug => res.json(bug))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res) => {
    Bug.findByIdAndDelete(req.params.id)
    .then(() => res.json('Bug deleted.'))
    .catch(err => res.status(400).json('Error: '+err));
});
//TO DO: make a route so that we can send only the field to update instead of all of them
router.route('/update/:id').post((req,res) => {
    Bug.findById(req.params.id)
    .then(bug => {
        bug.username = req.body.username;
        bug.description = req.body.description;
        bug.status = req.body.status;
        bug.date = Date.parse(req.body.date);

        bug.save()
        .then(() => res.json("Bug Updated"))
        .catch(err => res.status(400).json('Error: '+err));

    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;