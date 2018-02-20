var log4js = require('log4js');
log4js.configure({
  appenders: { challenge: { type: 'file', filename: 'logs/take-me-home.log', maxLogSize: 10485760, backups: 3, compress: false } },
  categories: { default: { appenders: ['challenge'], level: 'error' } }
});