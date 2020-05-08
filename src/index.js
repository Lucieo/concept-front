import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthPage from 'layouts/AuthPage';
import ConnectedPages from 'layouts/ConnectedPages';
import './Main.css';


function IsLoggedIn() {
  return localStorage.getItem('esquisse-token') ? <ConnectedPages/> : <AuthPage/>;
}

const Root = () => {
  return (
    <IsLoggedIn />
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
