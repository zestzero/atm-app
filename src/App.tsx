import { FunctionComponent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hook';
import { Page } from 'features/pageConfig/types';
import { changePage } from 'features/pageConfig/pageConfigSlice';
import { AuthStatus } from 'features/authentication/types';
import Withdraw from 'components/Pages/Withdraw/Withdraw';
import Login from 'components/Pages/Login/Login';
import Modal from 'components/Modal/Modal';
import styles from './App.module.scss';

const App: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector((state) => state.pageConfig.currentPage);
    const authStatus = useAppSelector((state) => state.auth.status);

    useEffect(() => {
        if (authStatus === AuthStatus.Failed) dispatch(changePage(Page.LOGIN));
        if (authStatus === AuthStatus.Success) dispatch(changePage(Page.WITHDRAW));
        if (authStatus === AuthStatus.Error) dispatch(changePage(Page.ERROR));
        if (authStatus === AuthStatus.Pending) dispatch(changePage(Page.LOADING));
    }, [authStatus]);

    return (
        <div>
            <div className={styles.header}>Welcome to ATM</div>
            <div className={styles.body}>
                {currentPage === Page.LOGIN && <Login />}
                {currentPage === Page.WITHDRAW && <Withdraw />}
                {currentPage === Page.ERROR && <h1>Out of service!</h1>}
            </div>
            {currentPage === Page.LOADING && <Modal>TEST</Modal>}
        </div>
    );
};

export default App;
