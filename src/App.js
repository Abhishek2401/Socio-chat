import React from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './App.css';
import { BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import Login from './Login';
import {useStateValue} from './StateProvider';



function App() {

  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login/>
      ):(
        <div className='app-body'>
        <Router>
          <Sidebar/> 
          <Switch>
            <Route path='/room/:roomId'>
              <Chat/>
            </Route>
          </Switch>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
