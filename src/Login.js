import React from 'react';
import {Button} from '@material-ui/core';
import {auth, provider} from './firebase';
import './Login.css';

function Login() {
    const signIn = () => {
        // firebase提供的功能，自動連結google帳戶
        auth.signInWithPopup(provider).catch(error=>alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://www.flaticon.com/svg/static/icons/svg/889/889101.svg" alt=""/>
                <h1>iMessage</h1>
            </div>
            <Button onClick={signIn}>登入</Button>
        </div>
    )
}

export default Login
