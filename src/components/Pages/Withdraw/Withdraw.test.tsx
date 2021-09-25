import 'jest';
import { fireEvent, render, screen, waitFor } from 'utils/test-utils';
import Withdraw from './Withdraw';

describe('<Withdraw />', () => {
    it('should render correctly', async () => {
        const { getByDataCy } = render(<Withdraw />);
        const buttons = await screen.findAllByRole('button');
        expect(buttons.length).toEqual(14);
        fireEvent.click(screen.getByText('1'));
        fireEvent.click(screen.getByText('4'));
        fireEvent.click(screen.getByText('0'));
        await waitFor(() => getByDataCy('numpad-text'));
        expect(getByDataCy('numpad-text')).toHaveTextContent('140');
        expect(getByDataCy('current-balance')).toHaveTextContent('Your current balance is £0');
    });
});
