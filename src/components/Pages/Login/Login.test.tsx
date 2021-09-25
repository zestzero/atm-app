import 'jest';
import { fireEvent, render, screen, waitFor } from 'utils/test-utils';
import Login from './Login';

describe('<Login />', () => {
    it('should render correctly', async () => {
        const { getByDataCy } = render(<Login />);
        const buttons = await screen.findAllByRole('button');
        expect(buttons.length).toEqual(12);
        fireEvent.click(screen.getByText('1'));
        fireEvent.click(screen.getByText('2'));
        fireEvent.click(screen.getByText('3'));
        fireEvent.click(screen.getByText('4'));
        await waitFor(() => getByDataCy('pinpad-text'));
        expect(getByDataCy('pinpad-text')).toHaveTextContent('****');
        expect(screen.getByText(/Enter your pin/i)).toBeDefined();
        expect(screen.getByText(/Be safe, get vaccinated/i)).toBeDefined();
    });
});
