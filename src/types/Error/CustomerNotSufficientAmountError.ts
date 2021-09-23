class CustomerNotSufficientAmountError extends Error {
    constructor() {
        super('Customer does not have sufficient amount');
    }
}

export default CustomerNotSufficientAmountError;
