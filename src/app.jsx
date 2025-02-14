import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Click } from './click/click';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
        <div className='body'>
            <header>
                <table>
                    <thead>
                        <tr>
                            <td className="nav-page">
                            <a className="brand">Duck-io<sup>&reg;</sup></a>&emsp;
                            <NavLink className="nav-link" to="">Home</NavLink>&emsp;
                            <NavLink className="nav-link" to="click">Click Ducks</NavLink>&emsp;
                            <NavLink className="nav-link" to="about">About</NavLink>
                            </td>
                        </tr>
                    </thead>
                </table>
            </header>

            <Routes>
                <Route path='/' element={<Home />} exact />
                <Route path='/click' element={<Click />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes> 

            <footer>
                <span className="text-reset">Emilee Forbush</span>
                <a href="https://github.com/webprogramming260/simon-html">Source</a>
            </footer>
        </div>
    </BrowserRouter>
    );
}

function NotFound() {
    return <main>404: Return to sender. Address unknown.</main>;
}