module.exports = {
    errorResponse: (res, status, message) => {
        return res.status(status).json({
            status: "Failed",
            message
        });
    },
    successResponse: (res, status, data) => {
        return res.status(status).json({
            status: 'Success',
            data
        })
    }
}