const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
var fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destination = path.join("./uploads", "T" + req.body.tunnelNum);
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /tunnel",
  });
});

router.post("/", upload.single("tunnelImg"), (req, res, next) => {
  console.log(req.file);
  const tunnel = {
    tunnelNum: req.body.tunnelNum,
    datetime: req.body.datetime,
  };
  res.status(200).json({
    message: "Handling POST request to /tunnel",
    tunnel: tunnel,
  });
  console.log(tunnel);
});

router.get("/:number", (req, res, next) => {
  const num = req.params.number;
  res.status(200).json({
    message: "Handling GET request to /tunnel/" + num,
  });
});

router.get("/:number/:datetime", (req, res, next) => {
  const num = req.params.number;
  const datetime = req.params.datetime;

  res.status(200).json({
    message:
      "Handling GET request to /tunnel/" + num + " with datetime " + datetime,
  });
});

module.exports = router;
