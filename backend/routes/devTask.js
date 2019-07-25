const router = require('express').Router();
let developerTask = require('../models/developerTask.modal');

router.route('/').get((req, res) => {
    developerTask.find()
    .then(devTask => res.json(devTask))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newDevTask= new developerTask({
    username,
    description,
    date,
  });

  newDevTask.save()
  .then(() => res.json('Dev task added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    developerTask.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    developerTask.findByIdAndDelete(req.params.id)
    .then(() => res.json('Dev task deleted'))
    .catch(err => res.status(400).json('Error: ' +err ))
});

router.route('/update/:id').post((req, res) =>{
    developerTask.findById(req.params.id)
    .then(devTask => {
        devTask.username = req.body.username;
        devTask.description = req.body.description;
        devTask.date = Date.parse(req.body.date);

        devTask.save()
        .then(() => res.json('dev task updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' +err ))
    });

module.exports = router;