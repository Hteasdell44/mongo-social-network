const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(

    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (time) => {return time.toUTCString()},

        },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
      }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      unique: true,
      get: (time) => {return time.toUTCString()},
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
