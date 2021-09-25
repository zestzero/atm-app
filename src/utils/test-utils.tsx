import { FC, ReactElement } from 'react';
import { render, RenderOptions, RenderResult, queries } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import * as customQueries from './custom-queries';

const AllTheProviders: FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper' | 'queries'>): RenderResult =>
    render(ui, { wrapper: AllTheProviders, queries: { ...queries, ...customQueries }, ...options });

export * from '@testing-library/react';
export { customRender as render };
