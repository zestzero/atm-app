import { render, screen } from './utils/test-utils';
import App from './App';

test('renders header correctly', () => {
    render(<App />);
    const enterBtn = screen.getByText(/Welcome to ATM/i);
    expect(enterBtn).toBeInTheDocument();
});
