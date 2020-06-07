import React from 'react';
import './App.css';
import ShowUsers from './components/ShowUsers';
import AddUser from './components/AddUser';

function App() {
  return (
    <div className="App">
      <AddUser />
      <ShowUsers />
    </div>
  );
}

export default App;
