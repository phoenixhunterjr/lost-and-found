import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { Link } from 'react-router-dom'; 

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://lost-and-found-1-7wnr.onrender.com/api/register', form);
      alert('Registered! Please login.');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} /><br/>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} /><br/>
      <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} /><br/>
      <button onClick={handleSubmit}>Register</button>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}