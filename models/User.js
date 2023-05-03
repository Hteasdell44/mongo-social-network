const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,

    },
    thoughts: {
      type: Array,
    },
    friends: {
      type: Array,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
