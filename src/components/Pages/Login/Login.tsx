import { FunctionComponent } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hook';
import PinPad from 'components/NumPad/PinPad';
import { authPin } from 'features/authentication/authenticationSlice';
import { AuthStatus } from 'features/authentication/types';
import styles from './Login.module.scss';

const Login: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector((state) => state.auth.status);

    const onAuthClick = async (pin?: string) => {
        dispatch(authPin({ pin: pin || '' }));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginTitle}></div>
            <div>
                {authStatus === AuthStatus.Failed && <h3>Wrong pin</h3>}
                <PinPad pinLength={4} onAuthClick={onAuthClick} />
            </div>
        </div>
    );
};

export default Login;
