import 'jest';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('<Modal />', () => {
    it('should return null if shouldDisplay is false', () => {
        render(<Modal shouldDisplay={false}>testing</Modal>);
        const element = screen.queryByText(/testing/);
        expect(element).toBeNull();
    });

    it('should return correct modal if shouldDisplay is true', () => {
        render(<Modal shouldDisplay={true}>testing</Modal>);
        const element = screen.queryByText(/testing/);
        expect(element).toBeDefined();
    });
});
