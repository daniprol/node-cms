const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
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
      required: true
    },
    description: {
      type: String,
      required: true,
    },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("category", PostSchema);

module.exports = CategoryModel;
