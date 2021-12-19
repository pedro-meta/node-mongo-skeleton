const mongoose = require("mongoose");
const { Schema } = mongoose;
//type_of_product, brand, color, description, status, owner_id, lost_date, found_date
const itemSchema = new Schema(
  {
    type_of_product: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lost_date: Date,
    found_date: Date
  },
  { timestamps: true }
);
const itemModel = mongoose.model("item", itemSchema);

module.exports = itemModel;
