const os = require("os");

function getSystemInfo() {
    return {
        cpuCount: os.cpus().length,
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
        platform: os.platform()
    };
}

module.exports = getSystemInfo;
const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "system-log.txt");

function logData(data) {
    const log = `${new Date().toISOString()} | ${JSON.stringify(data)}\n`;
    fs.appendFile(logPath, log, () => {});
}

module.exports = logData;

const getSystemInfo = require("./systemInfo");
const logData = require("./logger");

setInterval(() => {
    const info = getSystemInfo();
    logData(info);
}, 5000);
