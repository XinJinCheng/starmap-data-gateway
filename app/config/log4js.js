"use strict";

let log4js = {
    appenders: {
        console: {
            type: 'console'
        }, 
        file: {
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 1024000,
            backups: 4,
        }
    },
    categories: {
        default: {appenders: ['console', 'file'], level: 'debug'}
    },
    replaceConsole: true
};

module.exports = log4js;
