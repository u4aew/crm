const log4js = require('log4js');

log4js.configure({
  appenders: { 'api': { type: 'file', filename: 'api/logs/api.log' } },
  categories: { default: { appenders: ['api'], level: 'debug'}}});

const Logger = log4js.getLogger('api');

module.exports = Logger;

