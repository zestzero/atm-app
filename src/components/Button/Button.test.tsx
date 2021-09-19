import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('<Button />', () => {
    const onClickMock = jest.fn();

    test('render and handle event correctly', () => {
        render(<Button value="1" onClick={onClickMock} />);
        userEvent.click(screen.getByRole('button'));
        expect(onClickMock).toHaveBeenCalledWith('1');
    });
});
