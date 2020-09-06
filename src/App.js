import React, { useEffect } from 'react';
import {Provider} from 'react-redux'
import { BrowserRouter as Router, Route , Switch, useHistory, Redirect } from 'react-router-dom'
import './App.css';
import Home from './Component/Home/Home'
import Login from './Component/Login/Login'
//import Orders from './Component/Orders/Orders'
import Addmenu from './Component/Addmenu/Addmenu'
import Notfound from './Component/Notfound'
import ProtectedRoute from './ProtectedRoute'
import {FakeAuth} from './Service'
import {createStore} from 'redux'
import  rootReducer from './Store/reducer'
const store = createStore(rootReducer)
function App() {
  let history = useHistory()
  let checkAuth = FakeAuth.authenticate(); 
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
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/addmenu" component={Addmenu} />
          <ProtectedRoute  path="/home" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
