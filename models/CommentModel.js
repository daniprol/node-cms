const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    commentIsApproved: {
        type: Boolean,
        default: false,
    }
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("comment", PostSchema);

module.exports = CommentModel;
