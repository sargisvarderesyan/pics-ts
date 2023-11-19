import React from 'react';
import AppRouter from './routes/AppRoutes';
import ThemeToggle from "./components/ThemeToggle";

const App: React.FC = () => {
  return (
      <div className="App">
          <ThemeToggle />
          <AppRouter />
      </div>
  );
};
export default App;



