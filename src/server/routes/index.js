/**
 * App routes definitions.
 */
"use strict";

let express = require("express");
const fg = require("fast-glob");
let router = express.Router();

fg.sync("**.routes.js").forEach((file) => {
  require(`../../../${file}`)(router);
});

module.exports = router;
