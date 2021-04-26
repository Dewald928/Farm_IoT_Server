const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const serveIndex = require('serve-index');

const tunnelRoutes = require("./api/routes/tunnel");

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'),serveIndex('uploads', {'icons': true}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// CORS handling
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Acess-Control.Allow.Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
        return res.status(200).json({})
    }
    next();
});


app.use("/tunnel", tunnelRoutes);

//Error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
