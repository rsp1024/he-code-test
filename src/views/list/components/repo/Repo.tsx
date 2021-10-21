// Components
import { Button } from 'components/button';

// CSS
import './Repo.css';

// Types
type Props = {
  author?: string;
  stars?: number;
  name?: string;
  language?: string;
  id?: number;
  onClick: (e: any) => void; // TODO: type Event
};

const rootClass = 'repo';

export function Repo({ author, stars, name, language, id, onClick }: Props) {
  return (
    <div className={`${rootClass}__container`} data-testid="repo-container">
      <h3 data-testid="repo-name">{name}</h3>
      <p data-testid="repo-author">📖 Authored by {author}</p>
      <p data-testid="repo-stars">⭐️ {stars} stars</p>
      {language && <p data-testid="repo-language">✍️ Written in {language}</p>}
      <Button
        dataTest="repo-view-details-btn"
        onClick={onClick}
        to={`/details/${id}`}
      >
        View Details
      </Button>
    </div>
  );
}
