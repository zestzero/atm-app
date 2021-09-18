import { FunctionComponent, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthenticationService } from './services/AuthenticationService';

const authService = new AuthenticationService();
const pin = process.env.REACT_APP_TEMP_PIN; // for testing

const App: FunctionComponent = () => {
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
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
                <p>Your balance {currentBalance}</p>
            </header>
        </div>
    );
};

export default App;
