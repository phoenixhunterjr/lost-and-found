import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { Link } from 'react-router-dom'; 

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://lost-and-found-1-7wnr.onrender.com/api/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
  
      <input 
        placeholder="Email" 
        onChange={e => setForm({...form, email: e.target.value})} 
      />
  
      <input 
        placeholder="Password" 
        type="password" 
        onChange={e => setForm({...form, password: e.target.value})} 
      />
  
      <button onClick={handleSubmit}>Login</button>
  
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  );
}