import React from 'react';
import FormLayout from './components/Formlayout/FormLayout';
import TableLayout from './components/TableLayout/TableLayout';
import { Route } from 'react-router-dom'
import Navbar from './components/Common/Navbar';
import Loader from './components/Common/Loader';

function App() {
  
  
  
  return (
    <div className="App">
      <Navbar />
      <Loader />
      <Route exact path={'/'} component={TableLayout} />
      <Route path={'/layout'} component={FormLayout} />
    </div>
  );
}

export default App;
