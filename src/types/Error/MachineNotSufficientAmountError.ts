class MachineNotSufficientAmount extends Error {
    constructor() {
        super('Machine does not have sufficient amount');
    }
}

export default MachineNotSufficientAmount;
