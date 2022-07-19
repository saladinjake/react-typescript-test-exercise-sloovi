import React from 'react';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }: AppProps) => {
  return (
    <div >
      {children}
    </div>
  );
};

export default App;
