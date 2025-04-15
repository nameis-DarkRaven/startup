import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialogue } from './messageDialogue';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <>
      <form>
        <div>
          <input className="login-group1" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="your@email.com" />
        </div>
         <br />
        <div>
          <input className="login-group1" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        </div>
        <br />
        <Button className="login-group2" id="login" variant='secondary' type="submit" onClick={() => loginUser()} disabled={!userName || !password}>
            Login
            </Button>
        <Button className="login-group2" type="submit" variant='secondary' onClick={() => createUser()} disabled={!userName || !password}>
            Register
            </Button>
      </form>

      <MessageDialogue message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
