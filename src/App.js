import React from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './components/pages/Home/Home';
import AddMovie from './components/pages/AddMovie/AddMovie';
import EditMovie from './components/pages/EditMovie/EditMovie';
import Navigation from "./components/Navigation/Navigation";

import "./App.css";
import './index.css';

//status message incase there is an error on add/edit movie
//search filter based on title/genre
// placeholder radio button/dropdown menu??--
//navigation not sticky anymore?
//rating not working on decimal?
//mouseover/leave on moviecards 

function App() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <div className= 'wrapper'>
            <Switch>
              <Route exact path= '/' component={Home} />
              <Route exact path= '/movie/add' component={AddMovie} />
              <Route exact path= '/movie/edit/:id' component={EditMovie}/>
            </Switch>
        </div>
      </div>
      </BrowserRouter>
    );
  }

export default App;
