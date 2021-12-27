const mongoose = require('mongoose');
const {Schema} = mongoose;
const itemSchema = new Schema(
    {
      type_of_product: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      owner_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      lost_date: Date,
      found_date: Date,
    },
    {timestamps: true},
);
itemSchema.index({
  type_of_product: 'text',
  brand: 'text',
  color: 'text',
  description: 'text',
});
const itemModel = mongoose.model('item', itemSchema);

module.exports = itemModel;
