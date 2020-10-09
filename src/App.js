import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import Main from './components/Main';

function App() {
  return (
   
    <div >
        <Route path='/' component={Main}/>
    </div>
  );
}

export default App;
