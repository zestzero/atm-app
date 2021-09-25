import { queryHelpers, buildQueries, Matcher, MatcherOptions } from '@testing-library/react';

const queryAllByDataCy = (...args: [HTMLElement, Matcher, MatcherOptions]): HTMLElement[] =>
    queryHelpers.queryAllByAttribute('data-cy', ...args);

const getMultipleError = (c: HTMLElement, dataCyValue: Matcher) =>
    `Found multiple elements with the data-cy attribute of: ${dataCyValue}`;
const getMissingError = (c: HTMLElement, dataCyValue: Matcher) =>
    `Unable to find an element with the data-cy attribute of: ${dataCyValue}`;

const [queryByDataCy, getAllByDataCy, getByDataCy, findAllByDataCy, findByDataCy] = buildQueries(
    queryAllByDataCy,
    getMultipleError,
    getMissingError,
);

export { queryByDataCy, queryAllByDataCy, getByDataCy, getAllByDataCy, findAllByDataCy, findByDataCy };
