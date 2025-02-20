import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5001/login', { username, password });
            setToken(response.data.token);
            alert("Login successful!");
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>JWT Authentication</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <button onClick={handleLogin}>Login</button>

            {token && <p>JWT Token: <br /> {token}</p>}
        </div>
    );
}

export default App;
