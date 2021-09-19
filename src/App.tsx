import { FunctionComponent, useEffect, useState } from 'react';
import { AuthenticationService } from './services/AuthenticationService';
import './App.scss';
import { useAppSelector } from './app/hook';
import { NumPad } from './components/NumPad/NumPad';

const authService = new AuthenticationService();
const pin = process.env.REACT_APP_TEMP_PIN; // for testing

const App: FunctionComponent = () => {
    const currentPage = useAppSelector((state) => state.pageConfig.currentPage);
    const [currentBalance, setCurrentBalance] = useState<number>(0);

    const auth = async () => {
        const response = await authService.request({ pin: pin as string });
        setCurrentBalance(response.currentBalance);
    };

    useEffect(() => {
        auth();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>Your balance {currentBalance}</p>
                <p>current page: {currentPage}</p>
                <NumPad />
            </header>
        </div>
    );
};

export default App;
