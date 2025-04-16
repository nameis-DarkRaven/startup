import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './home/login';
import { Click } from './click/click';
import { About } from './about/about';
import { AuthState } from './home/authState';

export default function App() {
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = useState(currentAuthState);

    return (
        <BrowserRouter>
            <div className='body'>
                <header>
                    <table>
                        <thead>
                            <tr>
                                <td className="nav-page">
                                    <a className="brand">Duck-io<sup>&reg;</sup></a>&emsp;
                                    <NavLink className="nav-link" to="">Login</NavLink>&emsp;
                                    {authState === AuthState.Authenticated && (
                                        <NavLink className="nav-link" to="click">Click Ducks</NavLink>
                                    )}
                                    &emsp;<NavLink className="nav-link" to="about">About</NavLink>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </header>

                <Routes>
                    <Route path='/' element={
                        <Login
                            userName={userName}
                            authState={authState}
                            onAuthChange={(userName, authState) => {
                                setAuthState(authState);
                                setUserName(userName);
                            }} />
                    } exact />
                    <Route path='/click' element={<Click userName={userName} />} />
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    <span className="text-reset">Emilee Forbush</span>
                    <a href="https://github.com/nameis-DarkRaven/startup">Source</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main>404: Return to sender. Address unknown.</main>;
}