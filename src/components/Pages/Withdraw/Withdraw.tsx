import { FunctionComponent, useEffect, useState } from 'react';
import { useAppSelector } from 'app/hook';
import NumPad from 'components/NumPad/NumPad';
import DispenserService from 'services/Dispenser/DispenserService';
import DispenserConfigurationBuilder from 'services/Dispenser/DispenserConfigurationBuilder';
import { Item, Knapsack, ResultWithError } from 'types/dispenser';
import Modal from 'components/Modal/Modal';
import MachineNotSufficientAmount from 'types/Error/MachineNotSufficientAmountError';
import OutOfService from 'types/Error/OutOfServiceError';
import CustomerNotSufficientAmountError from 'types/Error/CustomerNotSufficientAmountError';

const config = new DispenserConfigurationBuilder().withNotes(20, 7).withNotes(10, 15).withNotes(5, 4);
const dispenserService = new DispenserService(config);
const Withdraw: FunctionComponent = () => {
    const currentBalance = useAppSelector((state) => state.auth.currentBalance);
    const [dispenseResult, setDispenseResult] = useState<ResultWithError<Knapsack<Item>>>({});
    const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (withdrawAmount > 0) {
            const result = dispenserService.withdraw(withdrawAmount, currentBalance);
            setDispenseResult(result);
            setLoading(false);
            setWithdrawAmount(0);
        }
    }, [withdrawAmount]);

    const onSubmit = (val?: string) => {
        setLoading(true);
        const amount = Number.parseFloat(val || '0');
        setWithdrawAmount(amount);
    };

    const renderDispenseResult = (result?: Knapsack<Item>) => {
        if (!result) return null;
        const { items } = result;
        return items.map((item, index) => <div key={`notes-${item.value}-${index}`}>{item.value}</div>);
    };

    const renderErrorMessage = (error?: Error) => {
        if (error instanceof CustomerNotSufficientAmountError) {
            return <Modal>You do not have sufficient amount of money.</Modal>;
        }
        if (error instanceof MachineNotSufficientAmount) {
            return <Modal>This machine doesn't have sufficient amount of money.</Modal>;
        }
        if (error instanceof OutOfService) {
            return <Modal>Out of service</Modal>;
        }
    };

    return (
        <div>
            <div>Withdraw: {currentBalance}</div>
            <NumPad onSubmit={onSubmit} />
            {renderDispenseResult(dispenseResult.result)}
            {renderErrorMessage(dispenseResult.error)}
            {loading && <Modal>Processing</Modal>}
        </div>
    );
};

export default Withdraw;
