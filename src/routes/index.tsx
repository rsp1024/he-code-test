import { BrowserRouter as Router, Route } from 'react-router-dom';

// Views
import { Details } from 'views/details';
import { Home } from 'views/home';
import { List } from 'views/list';

export function Routes() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/list" component={List} />
      <Route path="/details/:id" component={Details} />
    </Router>
  );
}
