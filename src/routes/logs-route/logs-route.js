const express = require('express');
const fs = require('fs');
const { constants, httpStatus } = require('../../util/constants/constants');
const logsRoute = express.Router();

logsRoute.get('/download/:level', (req, res) => {
    global.logLevel = req.params.level;
    const logFilePath = `${constants.LOGDIR}\\${logLevel}.log`;
    fs.promises
        .access(logFilePath)
        .then(() => {
            const logFileName = `Maxine - ${logLevel.toUpperCase()} 【 ${new Date().toUTCString()} 】.log`;
            res.download(logFilePath, logFileName);
        }).catch(() => {            
            res.status(httpStatus.STATUS_NOT_FOUND).json({"message": errMsg});
        });        
});

module.exports = logsRoute; 