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
        <>
            <div className={styles.header}>
                {'>>'} ATM {'<<'}
            </div>
            <div className={styles.wrapper}>
                <div className={styles.titleSection}>
                    <div className={styles.titleTextContainer}>
                        <div className={styles.titleText}>Be safe, get vaccinated</div>
                    </div>
                    <img className={styles.titleImage} src="/image_title.jpg" />
                </div>
                <div className={styles.pinSection}>
                    <span>Enter your pin</span>
                    <PinPad pinLength={4} onAuthClick={onAuthClick} />
                    {authStatus === AuthStatus.Failed && (
                        <span className={styles.error}>You have enter the wrong pin number. Please try again</span>
                    )}
                </div>
            </div>
        </>
    );
};

export default Login;
