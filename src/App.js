import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';
import Category from './components/Category';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/post/:id" component={Post} />
          <Route path="/category/:category" component={Category} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
