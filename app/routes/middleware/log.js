const colors = require('colors');

module.exports = (req, res, next) => {
    const startHrTime = process.hrtime();
    res.on("finish", () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        
        const requestLog = `${req.originalUrl} ` + `${res.statusCode}`.white +  ` ${elapsedTimeInMs}ms`;
        switch (req.method) {
            case 'GET':
                console.log(`${req.method} `.green + requestLog);
                break;
            case 'POST':
                console.log(`${req.method} `.blue + requestLog);
                break;
            case 'PUT':
                console.log(`${req.method} `.yellow + requestLog);
                break;
            case 'DELETE':
                console.log(`${req.method} `.red + requestLog);
                break;
            default:
                break;
        }
    });
    next();
};