var express = require("express");
var path = require("path");
var open = require("open");
var port = 3000;
var app = express();

/* static routes */
app.use("/jquery", express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use("/underscore", express.static(path.join(__dirname, "../node_modules/underscore")));
app.use("/backbone", express.static(path.join(__dirname, "../node_modules/backbone")));
app.use("/images", express.static(path.join(__dirname, "../src/images")));
app.use("/css", express.static(path.join(__dirname, "../src/css")));
app.use("/js", express.static(path.join(__dirname, "../src/js")));

/* routing HTTP requests */
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

/* port listener */
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open("http://localhost:" + port);
  }
});
