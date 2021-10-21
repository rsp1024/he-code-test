import { useAppSelector } from 'store/hooks';

// Components
import { Button } from 'components/button';

// Selectors
import { getDetails } from 'views/details/state/selectors';

// CSS
import './Details.css';

// Types
type Props = {
  match: {
    params: {
      id?: string;
    };
  };
};

const rootClass = 'details';

export function Details({ match }: Props) {
  // Hooks
  const details = useAppSelector(state => getDetails(state));

  const hasDetails = () => Object.keys(details).length > 0;

  // Show error if details is empty, otherwise render details
  if (!hasDetails()) {
    return (
      <div className={rootClass} data-testid="details-error">
        <nav>
          <Button to="/">Home</Button>
        </nav>
        <h1 className="error">🤕 Oops</h1>
        <p>I didn't have time to fix this. Here's what needs to happen:</p>
        <ul>
          <li>add q to global state</li>
          <li>when we hit this route directly call /search/repositories?q=q</li>
          <li>
            look for this repo id: {match.params.id} in the search results and
            set it in details.repo
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className={rootClass} data-testid="details-section">
      <nav>
        <Button to="/" dataTest="details-back-btn">
          Back to Results
        </Button>
      </nav>
      <div className={`${rootClass}__container`}>
        <h1 data-testid="details-name">{details.name}</h1>
        <p data-testid="details-description">{details.description}</p>
        <a
          href={details.html_url}
          target="_blank"
          rel="noreferrer"
          data-testid="details-url"
        >
          {details.html_url}
        </a>
        <p data-testid="details-author">📖 Authored by {details.owner.login}</p>
        <p data-testid="details-created-at">
          📅 {details.created_at?.split('T')[0]}
        </p>
        {details.private ? (
          <p data-testid="details-private-repo">🔒 Private repo</p>
        ) : (
          <p data-testid="details-public-repo">🔓 Public repo</p>
        )}
        <p data-testid="details-stars">⭐️ {details.stargazers_count} stars</p>
        {details.language && (
          <p data-testid="details-language">✍️ Written in {details.language}</p>
        )}
        <p data-testid="details-issues">
          🦟 {details.open_issues_count} issues
        </p>
        <p data-testid="details-forks">🍴 {details.forks} forks</p>
        <p data-testid="details-default-branch">
          🌲 {details.default_branch} is the default branch
        </p>
        <p data-testid="details-watchers">
          👀 {details.watchers_count} watchers
        </p>
      </div>
    </div>
  );
}
