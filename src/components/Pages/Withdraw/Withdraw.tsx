import { FunctionComponent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hook';
import NumPad from 'components/NumPad/NumPad';
import DispenserService from 'services/Dispenser/DispenserService';
import DispenserConfigurationBuilder from 'services/Dispenser/DispenserConfigurationBuilder';
import { Item, Knapsack, ResultWithError } from 'types/dispenser';
import Modal from 'components/Modal/Modal';
import { signoff, updateCurrentBalance, updateOverdrawnAmount } from 'features/authentication/authenticationSlice';

import MachineNotSufficientAmountError from 'types/Error/MachineNotSufficientAmountError';
import OutOfServiceError from 'types/Error/OutOfServiceError';
import CustomerNotSufficientAmountError from 'types/Error/CustomerNotSufficientAmountError';
import InvalidAmountError from 'types/Error/InvalidAmountError';

import styles from './Withdraw.module.scss';
import Button from 'components/Button/Button';
import { currencyFormatter } from 'utils/currencyFormatter';
import Loading from 'components/Loading/Loading';
import { changePage } from 'features/pageConfig/pageConfigSlice';
import { Page } from 'features/pageConfig/types';

const config = new DispenserConfigurationBuilder().withNotes(20, 7).withNotes(10, 15).withNotes(5, 4);
const dispenserService = new DispenserService(config);
const Withdraw: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const selectedCurrency = useAppSelector((state) => state.pageConfig.currency);
    const currentBalance = useAppSelector((state) => state.auth.currentBalance);
    const overdrawnAmount = useAppSelector((state) => state.auth.overdrawnAmount);
    const [dispenseResult, setDispenseResult] = useState<ResultWithError<Knapsack<Item>>>({});
    const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
    const [displayOverdrawnAlert, setOverdrawnAlert] = useState<boolean>(false);
    const [useOverdrawn, setUseOverdrawn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!loading || displayOverdrawnAlert) return;
        if (withdrawAmount > 0) {
            const result = dispenserService.withdraw(withdrawAmount, currentBalance + overdrawnAmount);
            if (result.result) {
                if (useOverdrawn) {
                    dispatch(
                        updateOverdrawnAmount(
                            dispenserService.getOverdrawnRemaining(
                                result.result.value,
                                currentBalance,
                                overdrawnAmount,
                            ),
                        ),
                    );
                }
                dispatch(updateCurrentBalance(currentBalance - result.result.value));
            }
            setDispenseResult(result);
            setLoading(false);
            setUseOverdrawn(false);
            setWithdrawAmount(0);
        }
    }, [withdrawAmount, useOverdrawn]);

    const onSubmit = (val?: string) => {
        const amount = Number.parseFloat(val || '0');
        if (amount <= 0) return;
        if (dispenserService.shouldOverdrawn(amount, currentBalance, overdrawnAmount)) {
            setOverdrawnAlert(true);
        } else {
            setLoading(true);
        }
        setWithdrawAmount(amount);
    };

    const onCancel = () => {
        dispatch(signoff());
        if (
            (dispenseResult.error && dispenseResult.error instanceof MachineNotSufficientAmountError) ||
            dispenseResult.error instanceof OutOfServiceError
        ) {
            dispatch(changePage(Page.OUTOFSERVICE));
        }
    };
    const onOverdrawnClick = () => {
        setLoading(true);
        setOverdrawnAlert(false);
        setUseOverdrawn(true);
    };

    const onOverdrawnCancelClick = () => setOverdrawnAlert(false);
    const onErrorModalClick = () => setDispenseResult({});

    const renderDispenseResult = (result?: Knapsack<Item>) => {
        if (!result) return null;
        const { items } = result;
        const display: { [key: string]: number } = {};
        items.forEach((item) => {
            display[item.value] = (display[item.value] || 0) + 1;
        });
        const dispenseResult = Object.keys(display).map((note, index) => (
            <div key={`${note}-${index}`}>
                <strong>{display[note]}</strong>
                <span> x </span>
                <strong>{currencyFormatter(Number.parseFloat(note), selectedCurrency)}</strong>
            </div>
        ));

        return (
            <div>
                <h3>Withdrawing {currencyFormatter(result.value, selectedCurrency)}</h3>
                <h4>
                    <div>You should be receiving with the following notes.</div>
                    <div>Please check before leaving!</div>
                </h4>
                {dispenseResult}
            </div>
        );
    };

    const renderErrorMessage = (error?: Error) => {
        if (error instanceof CustomerNotSufficientAmountError) {
            return 'You do not have sufficient amount of money.';
        }
        if (error instanceof MachineNotSufficientAmountError) {
            return "This machine doesn't have sufficient amount of money.";
        }
        if (error instanceof InvalidAmountError) {
            return 'Withdraw amount should be greater than 0';
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleSection}>
                <h2>Your current balance is {currencyFormatter(currentBalance, selectedCurrency)}</h2>
                {renderDispenseResult(dispenseResult.result)}
            </div>
            <div className={styles.pinSection}>
                <div>Enter withdraw amount</div>
                <NumPad onSubmit={onSubmit} onCancel={onCancel} />
                <Modal shouldDisplay={displayOverdrawnAlert}>
                    <div>
                        <div>You're about to withdraw with exceeding amount.</div>
                        <div>{currencyFormatter(overdrawnAmount, selectedCurrency)} is available for overdrawn</div>
                    </div>
                    <div>
                        <Button className={styles.confirmBtn} onClick={onOverdrawnClick}>
                            Confirm
                        </Button>
                        <Button className={styles.cancelBtn} onClick={onOverdrawnCancelClick}>
                            Cancel
                        </Button>
                    </div>
                </Modal>
                <Modal shouldDisplay={!!dispenseResult.error}>
                    <div>{renderErrorMessage(dispenseResult.error)}</div>
                    <Button className={styles.cancelBtn} onClick={onErrorModalClick}>
                        OK
                    </Button>
                </Modal>
                <Modal shouldDisplay={loading}>
                    Processing <Loading />
                </Modal>
            </div>
        </div>
    );
};

export default Withdraw;
