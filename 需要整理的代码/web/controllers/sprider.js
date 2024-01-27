const express = require('express');
const sprider = express.Router();
const path = require('path');
const childProcess = require('../utils/process')
sprider.get('/', (req, res) => {
 
    childProcess.update();
    res.send('Hello World!')

});

module.exports = sprider;