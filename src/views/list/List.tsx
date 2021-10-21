import { useState, useEffect, FormEvent, ChangeEvent, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/hooks';

// Components
import { Button } from 'components/button';
import { Spinner } from 'components/spinner';
import { Repo } from 'views/list/components/repo';

// Actions/Selectors
import { getRepos, getFetchStatus } from 'views/list/state/selectors';
import { fetchRepos } from 'views/list/state/listSlice';
import { setDetails } from 'views/details/state/detailsSlice';

// CSS
import './List.css';

// Types
type Languages = { [key: string]: number };

const rootClass = 'list';

export function List() {
  // Hooks
  const dispatch = useDispatch();
  const reposArr = useAppSelector(state => getRepos(state));
  const fetchStatus = useAppSelector(state => getFetchStatus(state));
  const [repos, setRepos] = useState(reposArr);
  const [q, setQ] = useState('');
  const [sortBy, setSortBy] = useState('best-match');
  const [languages, setLanguages] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [showInputError, setShowInputError] = useState(false);

  /* TODO: setQ in global state
   * b/c if user goes into details view and
   * comes back to list view and selects a sort
   * option we no longer have q in local state
   */

  // Set repos to local state so we can filter repos
  // and still retain original repo list in global state
  useEffect(() => {
    setRepos(reposArr);
  }, [reposArr]);

  // Get language list for filtering
  useEffect(() => {
    if (repos.length > 0) {
      // Get all languages and filter out falsy values
      const tmpLanguages = repos
        .map(repo => repo.language)
        .filter(language => language);
      // Object that will store languages count
      const languageCount: Languages = {};

      // Add language count
      // E.g., { typescript: 3, go: 1 }
      tmpLanguages.forEach(
        language =>
          (languageCount[language] = languageCount[language]
            ? languageCount[language] + 1
            : 1)
      );

      setLanguages(languageCount);
    }
  }, [repos]);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    // Show error if input is empty, otherwise
    // dispatch fetch repos
    if (!q) {
      setShowInputError(true);
    } else {
      dispatch(fetchRepos({ q, sortBy }));
    }
  };

  // Handle sort sets sort option in state, removes filters from DOM,
  // and dispatches fetch repos with sortBy argument
  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e?.target?.value);
    setShowFilters(false);
    if (q) dispatch(fetchRepos({ q, sortBy: e.target.value }));
  };

  // Filter repos by language and setRepos to create a rerender
  const handleLanguageFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredRepos = repos.filter(
      repo => repo.language === e.target.value
    );
    setRepos(filteredRepos);
  };

  // Clear filters sets repos back to original unfiltered repo list
  // and removes filters from DOM
  const handleClearFilters = (e: any) => {
    e.preventDefault();
    setRepos(reposArr);
    setShowFilters(false);
  };

  // Sets details in global state so details page
  // can consume the details data
  const onRepoClick = (e: Event, repo: any) => {
    e.preventDefault();
    dispatch(setDetails(repo));
  };

  return (
    <div className={rootClass}>
      {/* HEADER & SEARCH INPUT */}
      <h1 data-testid="list-header">Raul Sanchez</h1>
      <form
        onSubmit={(e: FormEvent) => handleSubmitForm(e)}
        className={`${rootClass}__form`}
      >
        <label htmlFor="search" data-testid="list-search-form-label">
          Search Github Repos
        </label>
        <div className={`${rootClass}__form-items`}>
          {showInputError && !q && (
            <p className="error">Please enter a search term</p>
          )}
          <input
            className={`${rootClass}__input-box`}
            data-testid="list-search-form-input"
            type="search"
            name="search"
            id="search"
            placeholder="Search Repositories"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQ(e.target.value)
            }
          />
          <Button dataTest="list-search-form-btn">Search</Button>
        </div>
      </form>

      {/* SORT, FILTERS, & LIST VIEW */}
      {repos.length > 0 && (
        <div
          className={`${rootClass}__sort-filters`}
          data-testid="list-sort-section"
        >
          <div>
            <label htmlFor="sort">Sort by: </label>
            <select name="sort" id="sort" value={sortBy} onChange={handleSort}>
              <option value="best-match">Best Match</option>
              <option value="stars">Stars</option>
            </select>
          </div>
          <Button
            dataTest="list-filters-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </div>
      )}

      <div className={`${rootClass}__container`}>
        {fetchStatus === 'loading' && <Spinner />}

        {showFilters && Object.keys(languages).length && (
          <div className={`${rootClass}__filters`} data-testid="list-filters">
            <Button onClick={handleClearFilters}>Clear Filters</Button>
            {Object.keys(languages).map(lang => (
              <Fragment key={`${lang}-filter`}>
                <input
                  type="radio"
                  id={lang}
                  name="language"
                  value={lang}
                  onChange={e => handleLanguageFilter(e)}
                />
                <label htmlFor={lang}>
                  {lang} ({languages[lang as keyof typeof languages]})
                </label>
              </Fragment>
            ))}
          </div>
        )}

        {fetchStatus === 'succeeded' && (
          <h2 data-testid="list-results-found">{repos.length} results found</h2>
        )}
        {repos.map(repo => (
          <Repo
            author={repo.owner.login}
            name={repo.name}
            stars={repo.stargazers_count}
            language={repo.language}
            id={repo.id}
            onClick={(e: Event) => onRepoClick(e, repo)}
            key={repo.id}
          />
        ))}
      </div>
    </div>
  );
}
