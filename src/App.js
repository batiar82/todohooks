import React from 'react';
import './App.css';
import TopBar from './components/layout/TopBar';
import Todo from './components/Todo'
import SnackbarContextProvider from './components/SnackbarContext';
function App() {
  return (
    <div className="App">
      <TopBar/>
      <SnackbarContextProvider>
      <Todo/>
      </SnackbarContextProvider>
    </div>
  );
}

export default App;
