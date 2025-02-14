import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';

export function Home() {
  return (
    <main>
    <div className="main-sect">
      <h1 className="login-head">Welcome Back!</h1>
      <form>
        <div>
          <input className="login-group1" type="text" placeholder="your@email.com" />
        </div>
         <br />
        <div>
          <input className="login-group1" type="password" placeholder="password" />
        </div>
        <br />
        <button className="login-group2" id="login" type="submit">
            <NavLink className="nav-link" to="click">Login</NavLink>
            </button>
        <button className="login-group2" type="submit">
            <NavLink className="nav-link" to="click">Register</NavLink>
            </button>
      </form>
    </div>
  </main>
  );
}