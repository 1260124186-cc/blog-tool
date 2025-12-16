import React, { useState } from 'react';
import './styles/App.css';
import DocumentManager from './components/DocumentManager';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>博客工具</h1>
      </header>
      <main className="app-main">
        <DocumentManager />
      </main>
    </div>
  );
}

export default App;
