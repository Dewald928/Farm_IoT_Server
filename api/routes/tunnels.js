const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /tunnels'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST request to /tunnels'
    });
});

router.get('/:number', (req, res, next) => {
    const num = req.params.number;
    res.status(200).json({
        message: 'Handling GET request to /tunnels/' + num
    });
});

router.get('/:number/:datetime', (req, res, next) => {
    const num = req.params.number;
    const datetime = req.params.datetime;

    res.status(200).json({
        message: 'Handling GET request to /tunnels/' + num + ' with datetime' + datetime
    });
});

module.exports = router;