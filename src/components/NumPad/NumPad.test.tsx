import 'jest';
import { fireEvent, render, screen, waitFor } from 'utils/test-utils';
import NumPad from './NumPad';

describe('<NumPad />', () => {
    it('should render correctly', async () => {
        render(<NumPad onSubmit={jest.fn()} onCancel={jest.fn()} />);
        const buttons = await screen.findAllByRole('button');
        expect(buttons.length).toEqual(14);
    });

    it('should handle button click correctly', async () => {
        const onSubmitMock = jest.fn();
        const onCancelMock = jest.fn();
        const { getByDataCy } = render(<NumPad onSubmit={onSubmitMock} onCancel={onCancelMock} />);
        fireEvent.click(screen.getByText('1'));
        fireEvent.click(screen.getByText('2'));
        fireEvent.click(screen.getByText('3'));
        await waitFor(() => getByDataCy('numpad-text'));
        expect(getByDataCy('numpad-text')).toHaveTextContent('123');

        fireEvent.click(screen.getByText('Enter'));
        expect(onSubmitMock).toHaveBeenCalled();

        fireEvent.click(screen.getByText('Cancel'));
        expect(onCancelMock).toHaveBeenCalled();
    });
});
