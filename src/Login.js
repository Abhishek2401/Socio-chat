import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from './firebase'
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {

    const [{},dispatch] = useStateValue();
    const signIn = ()=>{
        auth.signInWithPopup(provider).then((result)=>{
            // console.log(result);
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        }).catch((err)=>{
            alert(err.message)
        })
    }

    return (
        <div className='login'>
            <div className='login-container'>
                <img src='https://image.flaticon.com/icons/png/512/892/892228.png' alt=''/>
                <h2>Sign in to Socio-chat</h2>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login
