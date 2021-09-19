import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumButton from './NumButton';

describe('<NumButton />', () => {
    const onClickMock = jest.fn();

    test('render and handle event correctly', () => {
        render(<NumButton number="1" onClick={onClickMock} />);
        const linkElement = screen.getByText(/1/i);
        expect(linkElement).toBeInTheDocument();

        userEvent.click(screen.getByRole('button'));
        expect(onClickMock).toHaveBeenCalledWith('1');
    });
});
