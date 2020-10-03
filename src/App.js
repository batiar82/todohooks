import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo'
import SnackbarContextProvider from './components/SnackbarContext';
function App() {
  return (
    <div className="App">
      <SnackbarContextProvider>
      <Todo/>
      </SnackbarContextProvider>
    </div>
  );
}

export default App;
