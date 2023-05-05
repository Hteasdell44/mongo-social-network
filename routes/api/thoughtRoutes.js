const router = require('express').Router();

const { createThought, getThoughts, getSingleThought, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thoughtController.js');


router.route('/')

    .get(getThoughts)
    
    .post(createThought);

router.route('/:userId')

    .get(getSingleThought)

    .put(updateThought)

    .delete(deleteThought);

router.route('/:thoughtId/reactions')

    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')

    .delete(removeReaction);


module.exports = router;