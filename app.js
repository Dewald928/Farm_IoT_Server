const express = require("express");
const app = express();

const tunnelRoutes = require('./api/routes/tunnels')

app.use('/tunnels', tunnelRoutes)

module.exports = app;