/**
* DB models.
*/
'use strict';
const fg = require("fast-glob");

fg.sync("**.model.js").forEach((file) => {
  require(`../../../${file}`);
});

module.exports = {};
