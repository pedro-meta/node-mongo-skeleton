/* eslint-disable require-jsdoc */
const item = require('../../server/models/item.model');
const APIFeatures = require('../../server/utils/apiFeatures');

async function create(req, res, next) {
  const itemData = req.body;
  itemData.status = `LOST`;
  const itemNew = await item.create(itemData);
  return res.status(201).send(itemNew);
}

async function read(req, res, next) {
  const items = new APIFeatures(item.find({}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
  const doc = await items.query;

  return res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
}

async function search(req, res, next) {
  console.log(req.query['keywords']);
  const items = new APIFeatures(
      item.find(
          {
            $text: {$search: req.query['keywords']},
          },
          {score: {$meta: 'textScore'}},
      ),
      req.query,
  )
      .sort([{score: {$meta: 'textScore'}}, 1])
      .limitFields()
      .paginate();

  const doc = await items.query;
  doc.sort((a, b)=> {
    return parseFloat(b._doc.score) - parseFloat(a._doc.score);
  });
  return res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
}

async function update(req, res, next) {
  const itemID = req.params.item_id;
  await item.findOneAndUpdate(
      {_id: itemID},
      req.body,
      {upsert: true, new: true},
      (err, doc) => {
        return res.status(200).send(doc);
      },
  );
}
// Implementing Logic Delete
async function del(req, res, next) {
  const itemID = req.params.item_id;
  await item.findOneAndDelete({_id: itemID}, (err) => {
    return res.status(204);
  });
}

module.exports = {create, read, search, update, del};
