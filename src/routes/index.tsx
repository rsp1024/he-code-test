import { BrowserRouter as Router, Route } from 'react-router-dom';

// Views
import { Details } from 'views/details';
import { List } from 'views/list';

export function Routes() {
  return (
    <Router>
      <Route path="/" exact component={List} />
      <Route path="/details/:id" component={Details} />
    </Router>
  );
}
