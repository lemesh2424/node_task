const colors = require('colors');

module.exports = (req, res, next) => {
    const startHrTime = process.hrtime();
    res.on("finish", () => {
        const elapsedTimeInMs = calcutaResponseTime(startHrTime);
        const requestLog = `${req.originalUrl} ` + `${res.statusCode}`.white + ` ${elapsedTimeInMs}ms`;
        const coloredRequestMethod = colorRequestMethod(req.method);
        console.log(`${coloredRequestMethod} ${requestLog}`);
    });
    next();
};

function colorRequestMethod(method) {
    switch (method) {
        case 'GET':
            return colors.green(method);
        case 'POST':
            return colors.blue(method);
        case 'PUT':
            return colors.yellow(method);
        case 'DELETE':
            return colors.red(method);
        default:
            return colors.white(method);
    }
}

function calcutaResponseTime(startHrTime) {
    const elapsedHrTime = process.hrtime(startHrTime);
    return elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
}