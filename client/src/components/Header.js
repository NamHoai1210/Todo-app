import React, {memo, useContext} from 'react';

import UserContext from '../context/UserContext';
import instance from './../auth';
import {useNavigate} from 'react-router-dom';
const Header = memo(() => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  function logout() {
    instance.post('/logout', {})
        .then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          user.setEmail('');
          user.setName('');
          navigate('/login');
        });
  }
  return (
    <header className="d-flex justify-content-between align-items-center mb-4 ">
      <p className="h1 m-0 fw-semibold logo-text">
        TODO
      </p>
      <div className="dropdown">
        <span className='user-name'>{user.name}</span>
        <button className="btn btn-link" type="button"
          data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fa fa-user-circle-o fa-2x user-button"
            aria-hidden="true"></i>
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href='/login' onClick={(e) => {
            e.preventDefault(); logout();
          }}>Log out</a></li>
          <li><a className="dropdown-item" href='/login/change-password'>
            Change Password
          </a></li>
        </ul>
      </div>
    </header>
  );
});
export default Header;
