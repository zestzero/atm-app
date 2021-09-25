import 'jest';
import { render, screen } from 'utils/test-utils';
import Withdraw from './Withdraw';

describe('<Withdraw />', () => {
    it('should render correctly', async () => {
        render(<Withdraw />);
        const buttons = await screen.findAllByRole('button');
        expect(buttons.length).toEqual(14);
    });
});
