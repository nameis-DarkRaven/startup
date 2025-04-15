import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <div className='playerName'>{props.userName}</div>
      <Button variant='secondary' color='white' onClick={() => navigate('/click')}>
        Click Ducks
      </Button>
      <Button variant='secondary' color='white' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
