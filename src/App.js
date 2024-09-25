import './App.css';
import React from 'react';
import PostPreviews from "./features/postPreviews/PostPreviews"
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
        <main>
        <PostPreviews />
        </main>
      
    </div>
  );
}

export default App;
