import { FunctionComponent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hook';
import { NumPad } from './components/NumPad/NumPad';
import { Page } from './features/pageConfig/types';
import './App.scss';
import { authPin } from './features/authentication/authenticationSlice';
import { changePage } from './features/pageConfig/pageConfigSlice';
import { AuthStatus } from './features/authentication/types';

const App: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector((state) => state.pageConfig.currentPage);
    const authStatus = useAppSelector((state) => state.auth.status);
    const currentBalance = useAppSelector((state) => state.auth.currentBalance);

    useEffect(() => {
        if (authStatus === AuthStatus.Success) {
            dispatch(changePage(Page.WITHDRAW));
        }
        if (authStatus === AuthStatus.Error) {
            dispatch(changePage(Page.ERROR));
        }
    }, [authStatus]);

    const onAuthClick = async (pin?: string) => {
        dispatch(authPin({ pin: pin || '' }));
    };

    return (
        <div className="App">
            <p>{currentBalance}</p>
            <header className="App-header">
                {currentPage === Page.LOGIN && <NumPad pinLength={4} onAuthClick={onAuthClick} />}
                {currentPage === Page.WITHDRAW && <h1>Withdraw</h1>}
                {currentPage === Page.ERROR && <h1>ERROR!</h1>}
            </header>
        </div>
    );
};

export default App;
