const User = require('../models/User');

module.exports = {

  async getUsers(req, res) {

    try {

      const users = await User.find();
      res.json(users);

    } catch (err) {

      res.status(500).json(err);

    }
  },

  async getSingleUser(req, res) {

    try {

      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {

        return res.status(404).json({ message: 'No user with that ID' });

      }

      res.json(user);

    } catch (err) {

      res.status(500).json(err);

    }
  },
  
  async createUser(req, res) {

    try {

      const newUser = await User.create(req.body);

      res.json(newUser);

    } catch (err) {

      res.status(500).json(err)

    }
  },

  async deleteUser(req, res) {

    try {

      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

      if (!deletedUser) {

        return res.status(404).json({ message: 'No user with that ID' });

      }

      res.json(deletedUser);

    } catch (err) {

      res.status(500).json(err);

    }
  },

  async updateUser(req, res) {

    try {

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(updatedUser);

    } catch (err) {

      res.status(500).json(err);

    }
  },

  async addFriend(req, res) {

    try {

      const newFriend = await User.findOne({ _id: req.params.friendId });

      const user = await User.findOneAndUpdate(

        { _id: req.params.userId },
        { $addToSet: { friends: newFriend} },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID' });
      }

      res.json(user);

    } catch (err) {

      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {

    try {

      const oldFriend = await User.findOne({ _id: req.params.friendId });

      const user = await User.findOneAndUpdate(

        { _id: req.params.userId },
        { $pull: { friends: oldFriend } },
        { runValidators: true, new: true }

      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);

    } catch (err) {

      res.status(500).json(err);
      
    }
  },

};
