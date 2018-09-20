"use strict";

const config = require('../config');
const log4js = require('log4js');

log4js.configure(config.LOG4JS);

let getLogger = function (name) {
    let logger = log4js.getLogger(name);
    return logger;
}

module.exports = getLogger;
