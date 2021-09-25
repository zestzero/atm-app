class InvalidAmountError extends Error {
    constructor() {
        super('Customer does not a valid amount');
    }
}

export default InvalidAmountError;
