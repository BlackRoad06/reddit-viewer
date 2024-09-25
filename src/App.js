import './App.css';
import React from 'react';
import PostPreviews from "./features/postPreviews/PostPreviews"
import Header from './components/Header';
import InputField from './components/InputField';

function App() {
  return (
    <div className="App">
      <Header />
      <PostPreviews />
    </div>
  );
}

export default App;
