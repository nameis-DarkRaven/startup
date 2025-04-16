import React from 'react';
import { AuthState } from './authState';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';

export function Login({userName, authState, onAuthChange}) {
  return (
    <main>
      <div className="main-sect">
        {authState !== AuthState.Unknown && <h1 className="login-head">Welcome Back!</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={()=> onAuthChange(userName, AuthState.Unauthenticated)}/>
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
          userName = {userName}
          onLogin={(loginUserName) => {
            onAuthChange(loginUserName, AuthState.Authenticated);
          }}/>
        )}
      </div>
    </main>
  );
}