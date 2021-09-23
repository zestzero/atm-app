import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GroupNumPad from './GroupNumPad';

describe('<GroupNumPad />', () => {
    const onButtonClickMock = jest.fn();
    const onBackspaceClickMock = jest.fn();
    const onResetClickMock = jest.fn();

    test('render and handle event correctly', () => {
        render(
            <GroupNumPad
                onButtonClick={onButtonClickMock}
                onBackspaceClick={onBackspaceClickMock}
                onResetClick={onResetClickMock}
            />,
        );
        const linkElement = screen.getByText(/1/i);
        expect(linkElement).toBeInTheDocument();

        userEvent.click(screen.getByText(/1/i));
        expect(onButtonClickMock).toHaveBeenCalled();

        userEvent.click(screen.getByText('<'));
        expect(onBackspaceClickMock).toHaveBeenCalled();

        userEvent.click(screen.getByText('-'));
        expect(onResetClickMock).toHaveBeenCalled();
    });
});
