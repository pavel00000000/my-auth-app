import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5153/api/auth/login', {
                UserName: username,
                Password: password
            });
            setMessage(`Token: ${response.data.token}`);
        } catch (error) {
            setMessage('Login failed: ' + error.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label>
                        Имя пользователя:
                        <input type="text" className="input-text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Пароль:
                        <input type="password" className="input-text" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                </div>
                <button type="submit" className="btn-login">Авторизоваться</button>
            </form>
            {message && <div className="token-box">{message}</div>}
        </div>
    );
}

export default Login;
