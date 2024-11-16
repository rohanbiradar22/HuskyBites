export const setResponse = (response, data) => {
    response.status(200)
        .json(data);
}

export const setErrorResponse = (response, err) => {
    response.status(500)
        .json({
            code: "ServiceError",
            message: "Error occured while processing your request." + err.message,
            error: err.message
        });
}