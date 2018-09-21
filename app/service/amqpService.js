"use strict";

const config = require('../config');
const logger = require('./logService')('amqpService.js');

const amqp = require('amqplib');

class AMPQService {

    constructor(params) {
    }

    emitMessage(ex, key, message) {

        return amqp.connect('amqp://' + config.AMQP.host).then(function (conn) {
            return conn.createChannel().then(function (ch) {
                // var ex = 'topic_logs';
                var ok = ch.assertExchange(ex, 'topic', { durable: true });
                return ok.then(function () {
                    ch.publish(ex, key, Buffer.from(message), {contentType:'text/plain'});
                    logger.debug(" [x] Sent %s:'%s'", key, message);
                    return ch.close();
                });
            }).finally(function () { conn.close(); })
        }).catch(function(e){
            logger.error(e);
        });
    }
}

module.exports = AMPQService;