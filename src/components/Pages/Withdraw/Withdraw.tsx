import { FunctionComponent } from 'react';
import { useAppSelector } from 'app/hook';
import NumPad from 'components/NumPad/NumPad';

const Withdraw: FunctionComponent = () => {
    const currentBalance = useAppSelector((state) => state.auth.currentBalance);
    const onSubmit = (val?: string) => {
        console.log('withdraw:' + val);
    };

    return (
        <div>
            <div>Withdraw: {currentBalance}</div>
            <NumPad onSubmit={onSubmit} />
        </div>
    );
};

export default Withdraw;
