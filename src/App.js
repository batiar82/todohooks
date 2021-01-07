import React from "react";
import "./App.css";
import TopBar from "./components/layout/TopBar";
import Todo from "./components/Todo";
import SnackbarContextProvider from "./components/SnackbarContext";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <TopBar />
      <QueryClientProvider client={queryClient}>
        <SnackbarContextProvider>
          <Todo />
        </SnackbarContextProvider>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
