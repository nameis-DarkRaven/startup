import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './click.css';

export function Click() {
  return (
    <main>
      <div className="players">
        Player:
        <span className="player-name">Mystery player</span>
      </div>
      <br />
      <div>
        <label htmlFor="count">Ducks:</label>
        <span>12,345</span>
      </div>
      <br />
      <div>
        <div>
          Click Me!
                </div>
                      <button className="duck button">
                          <img className="duck-img" src="Single-celled duck.png" alt="Starting Duck Picture"/>
                      </button>
            <table>
                <thead>
                    <tr>
                        <td>
                            <button><label className="title">Upgrades</label></button>
                            <div>
                            <button className="button" id="Upgrades">
                                Cell Division 
                            </button>
                                {/* <button id="Upgrades">
                                Swimming
                                </button>
                                <button id="Upgrades">
                                Flight
                                </button>
                                <button id="Upgrades">
                                Migration
                                </button>
                                <button id="Upgrades">
                                Pets
                                </button>
                                */}
                            </div>
                        </td>
                        <td>
                            <button>   
                            <label className="title">Duckielutions</label>
                            </button>
                            <div>
                            <button className="button" id="Duckielutions">Multi-Celled Duck</button>
                            </div>
                        </td>
                    </tr>
                </thead>
            </table>

            <br />
            <div className="scrolling-bar">
              <div className="quote">
                <p className="quote-text">
                "Everything is either a duck or not a duck." - Duck Supreme &emsp;</p>

                <p className="quote-text">You have begun life as a single cell. No other ducks exist.</p>
              </div>
            </div>
        </div>
    </main>

  );
}