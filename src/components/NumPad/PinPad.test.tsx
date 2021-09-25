import 'jest';
import { fireEvent, render, screen, waitFor } from 'utils/test-utils';
import PinPad from './PinPad';

describe('<PinPad />', () => {
    it('should render correctly', async () => {
        render(<PinPad onSubmit={jest.fn()} onCancel={jest.fn()} />);
        const buttons = await screen.findAllByRole('button');
        expect(buttons.length).toEqual(12);
    });

    it('should handle button click correctly', async () => {
        const onAuthClickMock = jest.fn();
        const { getByDataCy } = render(<PinPad pinLength={4} onAuthClick={onAuthClickMock} />);
        fireEvent.click(screen.getByText('1'));
        fireEvent.click(screen.getByText('2'));
        fireEvent.click(screen.getByText('3'));
        fireEvent.click(screen.getByText('4'));
        await waitFor(() => getByDataCy('pinpad-text'));
        expect(getByDataCy('pinpad-text')).toHaveTextContent('****');
        expect(onAuthClickMock).toHaveBeenCalled();
    });
});
