import { render, screen } from 'utils/testing';

// Components
import { Details } from 'views/details';

const mockDetails = {
  repo: {},
};

const mockProps = {
  match: {
    params: { id: 1024 },
  },
};

test('<Details /> UI w/Error', () => {
  render(<Details {...mockProps} />, {
    preloadedState: { details: mockDetails },
  });

  expect(screen.queryByTestId('details-error')).toBeInTheDocument();
});

test('<Details /> UI w/mock state', () => {
  mockDetails.repo = {
    name: 'js-lib',
    description: 'a cool js lib',
    html_url: 'https://www.github.com',
    owner: { login: 'raul' },
    created_at: '2021-01-01T0:0:0',
    private: false,
    stargazers_count: 1024,
    language: 'Haskell',
    open_issues_count: 3,
    forks: 5,
    default_branch: 'master',
    watchers_count: 101,
  };

  render(<Details {...mockProps} />, {
    preloadedState: { details: mockDetails },
  });

  expect(screen.queryByTestId('details-section')).toBeInTheDocument();
  expect(screen.queryByTestId('details-back-btn')).toBeInTheDocument();
  expect(screen.queryByTestId('details-name')).toBeInTheDocument();
  expect(screen.queryByTestId('details-description')).toBeInTheDocument();
  expect(screen.queryByTestId('details-url')).toBeInTheDocument();
  expect(screen.queryByTestId('details-author')).toBeInTheDocument();
  expect(screen.queryByTestId('details-created-at')).toBeInTheDocument();
  expect(screen.queryByTestId('details-public-repo')).toBeInTheDocument();
  expect(screen.queryByTestId('details-stars')).toBeInTheDocument();
  expect(screen.queryByTestId('details-language')).toBeInTheDocument();
  expect(screen.queryByTestId('details-issues')).toBeInTheDocument();
  expect(screen.queryByTestId('details-forks')).toBeInTheDocument();
  expect(screen.queryByTestId('details-default-branch')).toBeInTheDocument();
  expect(screen.queryByTestId('details-watchers')).toBeInTheDocument();
});
