import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialogue } from './messageDialogue';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrRegister(`/api/auth/login`);
    // localStorage.setItem('userName', userName);
    // props.onLogin(userName);
  }

  async function createUser() {
    loginOrRegister(`/api/auth/register`);
    // localStorage.setItem('userName', userName);
    // props.onLogin(userName);
  }

  async function loginOrRegister(endpoint){
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({email: userName, password: password}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else{
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
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
