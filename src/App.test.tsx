import { render, screen } from './utils/test-utils';
import App from './App';

test('renders enter button', () => {
    render(<App />);
    const enterBtn = screen.getByText(/enter/i);
    expect(enterBtn).toBeInTheDocument();
});
