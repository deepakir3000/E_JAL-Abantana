var logger = require('log4js');
const log4js_extend = require("log4js-extend");
logger.configure({
    "appenders": {
        "fileAppender": {
            "type": "file",
            "filename": "logs/dowr-server.log",
            "maxLogSize": 20480,
            "backups": 10
        },
        "console": {
            "type": "stdout"
        }
    },
    "categories": {
        "default": {
            "appenders": [
                "fileAppender",
                "console"
            ],
            "level": "debug"
        }
    }
}
);

log4js_extend(logger, {
    path: __dirname,
    format: "at @name (@file:@line:@column)"
  });

module.exports = {logger}
