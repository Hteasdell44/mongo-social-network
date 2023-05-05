const Thought = require('../models/Thought');

module.exports = {

  async getThoughts(req, res) {

    try {

      const thoughts = await Thought.find();
      res.json(thoughts);

    } catch (err) {

      res.status(500).json(err);

    }
  },

  async getSingleThought(req, res) {

    try {

      const thought = await Thought.findOne({ _id: req.params.userId });

      if (!thought) {

        return res.status(404).json({ message: 'No thought with that ID!' });

      }

      res.json(thought);

    } catch (err) {

      res.status(500).json(err);

    }
  },
  
  async createThought(req, res) {

    try {

      const newThought = await Thought.create(req.body);

      res.json(newThought);

    } catch (err) {

      res.status(500).json(err)

    }
  },

  async deleteThought(req, res) {

    try {

      const deletedThought = await Thought.findOneAndDelete({ _id: req.params.userId });

      if (!deletedThought) {

        return res.status(404).json({ message: 'No thought with that ID!' });

      }

      res.json(deletedThought);

    } catch (err) {

      res.status(500).json(err);

    }
  },

  async updateThought(req, res) {

    try {

      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {

        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(updatedThought);

    } catch (err) {

      res.status(500).json(err);

    }
  },

  async addReaction(req, res) {

    try {

      const newReaction = await Thought.findOneAndUpdate(

        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }

      );

      if (!newReaction) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID!' });
      }

      res.json(newReaction);

    } catch (err) {
      
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {

    try {

      const oldReaction = await Thought.findOneAndUpdate(

        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId} } },
        { runValidators: true, new: true }

      );

      if (!oldReaction) {

        return res
          .status(404)
          .json({ message: 'No thought found with that ID!' });
      }

      res.json(oldReaction);

    } catch (err) {
      
      res.status(500).json(err);
    }
  },

};
