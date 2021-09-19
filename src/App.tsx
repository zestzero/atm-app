import { FunctionComponent, useState } from 'react';
import { AuthenticationService } from './services/AuthenticationService';
import { useAppSelector } from './app/hook';
import { NumPad } from './components/NumPad/NumPad';
import { Page } from './features/pageConfig/types';
import './App.scss';

const authService = new AuthenticationService();

const App: FunctionComponent = () => {
    const currentPage = useAppSelector((state) => state.pageConfig.currentPage);
    const [currentBalance, setCurrentBalance] = useState<number>(0);

    const onAuthClick = async (pin?: string) => {
        const response = await authService.request({ pin: pin as string });
        if (response.isSuccess) {
            setCurrentBalance(response.data.currentBalance);
        } else {
            console.log('Auth error');
        }
    };

    return (
        <div className="App">
            <p>{currentBalance}</p>
            <header className="App-header">{currentPage === Page.LOGIN && <NumPad onAuthClick={onAuthClick} />}</header>
        </div>
    );
};

export default App;
