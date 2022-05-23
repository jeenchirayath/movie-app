import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import Login from './pages/Login';
import './app.scss';
import Detail from './pages/Detail';
import HomePage from './pages/Home';
import Signup from './components/auth/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthContext from "./components/context/Auth-Context";
import YourMovies from './pages/YourMovies';

function App() {

  const AuthCtx = useContext(AuthContext);
  return (
    <div className='app'>
      <Router>
        <div >
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            {/* {AuthCtx.user && (<Route path="/home" exact component={HomePage} />)}
            {AuthCtx.user && (<Route path="/movie/:imdbID" component={Detail} />)} */}
            <Route path="/home" exact component={HomePage} />
            <Route path="/movie/:imdbID" component={Detail} />
            <Route path="/your-movies" component={YourMovies}/>
            {/* <Route component={PageNotFound} /> */}
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
