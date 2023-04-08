import React from 'react'
import '../Styles/Login.scss'

export default function Login() {
  return (
    <div className='login'>
        <div className="form-login">
            <div className="brand">
                <i className="fa-brands fa-spotify"/>
                <h1>Spotify 2.0</h1>
            </div>
            <button onClick={() => {
              window.location.href = 'https://spotify2express.onrender.com'
            }}>Login</button>
        </div>
    </div>
  )
}
