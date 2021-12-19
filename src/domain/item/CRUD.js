const item = require("../../server/models/item.model");

async function create(req, res, next) {
  const itemData = req.body;
  const itemNew = await item.create(itemData);
  return res.sendStatus(201).send(itemNew);
}

async function read(req, res, next) {
  const items = await item.find({});
  return res.sendStatus(200).send(items);
}

async function update(req, res, next) {
  const itemID = req.params.item_id
  await user.findOneAndUpdate(
    { _id: itemID },
    req.body,
    { upsert: true, new: true },
    (err, doc) => {
      return res.sendStatus(200).send(doc);
    }
  );
}
//Implementing Logic Delete
async function del(req, res, next) {
  const userID = req.params.item_id
  await user.findOneAndDelete(
    { _id: itemID },
    (err) => {
      return res.sendStatus(204);
    }
  );
}

module.exports = { create, read, update, del };
