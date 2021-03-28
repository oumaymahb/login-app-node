const express = require("express");
const app = express();
const port = require('./config/keys').port;
var bodyParser = require('body-parser');
app.use(bodyParser.json())

require("./routes/userRoute")(app);
app.use(express.urlencoded({ extended: false }));

const db = require('./models/sequelize');
  
// force: true will drop the table if it already exists
db.sequelize.sync().then(() => {
  console.log('Drop and Resync with { force: true }');
});
// CORS setup for dev
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, PATCH');
  next();
});


// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to onCare Test.',
  }));

app.listen(port, () => {
    console.log(`API Server started and listening on port ${port} `);
  });