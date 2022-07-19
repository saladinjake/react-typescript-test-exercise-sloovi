import React from 'react';
import Header from './components/Header/Header';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }: AppProps) => {
  return (
    <div >
      <Header />
      {children}
    </div>
  );
};

export default App;
