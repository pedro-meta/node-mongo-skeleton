const item = require("../../server/models/item.model");

async function create(req, res, next) {
  const itemData = req.body;
  itemData.status = `LOST`
  const itemNew = await item.create(itemData);
  return res.status(201).send(itemNew);
}

async function read(req, res, next) {
  const items = await item.find({});
  return res.status(200).send(items);
}

async function update(req, res, next) {
  const itemID = req.params.item_id
  await item.findOneAndUpdate(
    { _id: itemID },
    req.body,
    { upsert: true, new: true },
    (err, doc) => {
      return res.status(200).send(doc);
    }
  );
}
//Implementing Logic Delete
async function del(req, res, next) {
  const itemID = req.params.item_id
  await item.findOneAndDelete(
    { _id: itemID },
    (err) => {
      return res.status(204);
    }
  );
}

module.exports = { create, read, update, del };
