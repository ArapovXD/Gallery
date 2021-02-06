import React, {useState} from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {AuthProvider} from './hooks/AuthContext';

function App() {
  
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profile/:handle" component={Profile}/>
        </AuthProvider>
      </Router>
      
    </div>
  );
}

export default App;
