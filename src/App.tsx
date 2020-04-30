import React from 'react';
import { LogProvider } from 'contexts/Log';
import Main from 'containers/Main';

function App() {
  return (
    <LogProvider>
      <Main />
    </LogProvider>
  );
}

export default App;
