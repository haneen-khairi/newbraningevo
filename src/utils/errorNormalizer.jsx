//if it's an instance of AxiosError, print the error from the response if possible
//else, print the error message
export default function errorNormalizer(error) {
    let errorMessage
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        try {
            errorMessage = error.response.data.validationErrors.map((e) => <p>{e.errorMessage}</p>);
        } catch (e) {
            errorMessage = error.response.data.errors.map((e) => <p>{e.errorMessage}</p>);
        }
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        errorMessage = error.message;
    } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
    }
    console.log(error.config);
    return errorMessage;
}