import { FunctionComponent } from 'react';
import { useAppDispatch, useAppSelector } from './app/hook';
import { NumPad } from './components/NumPad/NumPad';
import { Page } from './features/pageConfig/types';
import './App.scss';
import { authPin } from './features/authentication/authenticationSlice';

const App: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector((state) => state.pageConfig.currentPage);
    const currentBalance = useAppSelector((state) => state.auth.currentBalance);

    const onAuthClick = async (pin?: string) => {
        dispatch(authPin({ pin: pin || '' }));
    };

    return (
        <div className="App">
            <p>{currentBalance}</p>
            <header className="App-header">
                {currentPage === Page.LOGIN && <NumPad pinLength={4} onAuthClick={onAuthClick} />}
            </header>
        </div>
    );
};

export default App;
