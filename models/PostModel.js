const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "public",
    },
    allowComments: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: true,
    },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category'
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment'
      }
    ],
    file: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;
