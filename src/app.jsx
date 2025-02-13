import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';



export default function App() {
  return (
    <div className='body'>
        <header>
            <table className="menu-table">
                <thead>
                    <tr>
                        <td>
                            <img className="logo" src="./duck-icon.png" alt="Duck Icon"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a className="brand">Duck-io<sup>&reg;</sup></a>
                        </td>
                        <td className="nav-page">
                            <a href="click/click.html">Click Ducks</a>
                        </td>
                        <td className="nav-page">
                            <a href="about/about.html">About</a>
                        </td>
                    </tr>
                </thead>
            </table>
        </header>

        <main>
            App stuff goes here.
        </main>

        {/* <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/play' element={<Play />} />
            <Route path='/scores' element={<Scores />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
        </Routes>  */}

        <footer>
            <span className="text-reset">Emilee Forbush</span>
            <a href="https://github.com/webprogramming260/simon-html">Source</a>
        </footer>
    </div>);
}