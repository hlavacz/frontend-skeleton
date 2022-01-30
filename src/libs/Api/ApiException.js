export default class ApiException {
    constructor(code, message, responseCode) {
        this.code = code;
        this.responseCode = responseCode;
        this.message = message;
    }
}
