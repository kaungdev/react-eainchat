const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = parseInt(process.env.PORT, 10) || 3000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/oily", {
  useNewUrlParser: true
});

app.use(bodyParser.json());

require("./routes/user")(app);
require("./routes/general")(app);

app.get("*", (req, res) => {
  res.json({
    status: "failed",
    message: "page not exists"
  });
});

app.use(function(err, req, res, next) {
  return res.json({
    status: "failed",
    err
  });
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
