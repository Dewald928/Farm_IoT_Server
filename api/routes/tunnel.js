const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
var fs = require("fs");
const findRemoveSync = require('find-remove')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destination = path.join("./uploads", "T" + req.body.tunnelNum);
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "_" + file.originalname);
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
    // tunnelImg: req.file
  };
  res.status(200).json({
    message: "Handling POST request to /tunnel",
    tunnel: tunnel,
  });
  console.log(tunnel);
  // Delete images older than 1 week
  let result = findRemoveSync("./uploads", {age: {seconds: 7*24*60*60}, extensions: '.jpg'})
  console.log(result);
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

  const date_now = new Date().valueOf();
  let reqPath = path.join(__dirname, "../../");

  if (datetime === "latest") {
    filenames = fs.readdirSync(reqPath + "/uploads/T" + num + "/");
    filename = filenames[filenames.length - 1]; //TODO check by time that it is infact the latest
    console.log(filename);

    res.sendFile(reqPath +"./uploads/T" + num + "/" + filename)

    // res.status(200).json({
    //   filename: filenames[filenames.length - 1],
    //   imageURL: "./uploads/" + filenames[filenames.length - 1]
    // });
  }
});

module.exports = router;
