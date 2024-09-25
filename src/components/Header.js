import React from 'react';
import  "./Header.css";
import logo from './reddit-svgrepo-com.svg'
import InputField from './InputField';

const Header = () => {

    
  return (
    <header className="App-header">
    <div className='heading-and-logo'>
      <img src={logo} alt="Logo" className="App-logo" />
      <h1>Reddit<span className='viewer'>Viewer</span></h1>
    </div>
    <div className='inputField'>
    <InputField />
    </div>
  </header>
  );
};

export default Header;