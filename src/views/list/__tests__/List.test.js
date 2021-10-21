import { render, screen } from 'utils/testing';

// Component
import { List } from 'views/list';

const mockList = {
  status: 'succeeded',
  repos: [
    {
      owner: {
        login: 'Frankenstein',
      },
      name: 'spooky-js',
      stargazers_count: 1031,
      language: 'typescript',
      id: 1031,
    },
    {
      owner: {
        login: 'ArcticMonkeys',
      },
      name: 'new-shiny-js-thing',
      stargazers_count: 1024,
      language: 'typescript',
      id: 1,
    },
  ],
};

test('<List /> UI', () => {
  render(<List />, {
    preloadedState: { list: mockList },
  });

  expect(screen.queryByTestId('list-header')).toBeInTheDocument();
  expect(screen.queryByTestId('list-search-form-label')).toBeInTheDocument();
  expect(screen.queryByTestId('list-search-form-input')).toBeInTheDocument();
  expect(screen.queryByTestId('list-search-form-btn')).toBeInTheDocument();
  expect(screen.queryByTestId('list-sort-section')).toBeInTheDocument();
  expect(screen.queryByTestId('list-filters-btn')).toBeInTheDocument();
  expect(screen.queryByTestId('list-results-found')).toBeInTheDocument();
  expect(screen.queryAllByTestId('repo-container')).toHaveLength(2);
  expect(screen.queryAllByTestId('repo-name')).toHaveLength(2);
  expect(screen.queryAllByTestId('repo-author')).toHaveLength(2);
  expect(screen.queryAllByTestId('repo-stars')).toHaveLength(2);
  expect(screen.queryAllByTestId('repo-language')).toHaveLength(2);
  expect(screen.queryAllByTestId('repo-view-details-btn')).toHaveLength(2);
});
