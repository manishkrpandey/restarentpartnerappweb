import React, { useEffect } from 'react';
import {Provider} from 'react-redux'
import { BrowserRouter as Router, Route , Switch, useHistory, Redirect } from 'react-router-dom'
import './App.css';
import Login from './Component/Login/Login'
import {createStore} from 'redux'
import  rootReducer from './Store/reducer'
import Dashboard from './Component/Header/drawer'
const store = createStore(rootReducer)
function App() {
  let history = useHistory()
  let checkAuth = true; 
  useEffect(()=>{
    if(checkAuth){
      history.push('/home')
    }else{
      history.push('/')
    }
  })
  return (
    <Provider store={store}>
    <div className="App container-fluid">
    <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <PrivateRoute exact path="/home">
          <Dashboard />
        </PrivateRoute>
        <Route path="*">
        <Redirect
            to={{pathname:"/"}}
          />
          </Route>
      </Switch>
    </div>
    </Provider>
  );
}

export default App;

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
       localStorage.getItem('token') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
