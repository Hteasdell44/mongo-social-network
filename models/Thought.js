const { Schema, model, ObjectId } = require('mongoose');

const reactionSchema = new Schema(

    {
        reactionId: {
            type: Schema.Types.ObjectId,
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

reactionSchema.virtual('reactionTime').get(function() {
  return this.createdAt.toUTCString();
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

thoughtSchema.virtual('thoughtTime').get(function() {
  return this.createdAt.toUTCString();
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
