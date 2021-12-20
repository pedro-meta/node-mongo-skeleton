// Set up MongoDB.
require("./server/setup/mongoose")();

const PORT = 3000;
const app = require('./app')

// Start app.
server = app.listen(PORT, function () {
  console.log("App now listening on port " + PORT);
});
