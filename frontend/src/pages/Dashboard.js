import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ itemName: '', description: '', type: 'Lost', location: '', contactInfo: '' });
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchItems = async () => {
    const res = await axios.get('https://lost-and-found-1-7wnr.onrender.com/api/items', { headers });
    setItems(res.data);
  };

  useEffect(() => {

    if (!token) { 
  
      navigate('/'); 
  
      return; 
  
    }
  
    fetchItems();
  
  }, [token]);

  const addItem = async () => {
    await axios.post('https://lost-and-found-1-7wnr.onrender.com/api/items', form, { headers });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`https://lost-and-found-1-7wnr.onrender.com/api/items/${id}`, { headers });
    fetchItems();
  };

  const searchItems = async () => {
    const res = await axios.get(`https://lost-and-found-1-7wnr.onrender.com/api/items/search?name=${search}`, { headers });
    setItems(res.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard">
  
      <div className="header">
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>
  
      <div className="form-section">
        <h3>Add Item</h3>
  
        <input 
          placeholder="Item Name" 
          onChange={e => setForm({...form, itemName: e.target.value})} 
        />
  
        <input 
          placeholder="Description" 
          onChange={e => setForm({...form, description: e.target.value})} 
        />
  
        <select 
          onChange={e => setForm({...form, type: e.target.value})}
        >
          <option>Lost</option>
          <option>Found</option>
        </select>
  
        <input 
          placeholder="Location" 
          onChange={e => setForm({...form, location: e.target.value})} 
        />
  
        <input 
          placeholder="Contact Info" 
          onChange={e => setForm({...form, contactInfo: e.target.value})} 
        />
  
        <button onClick={addItem}>Add Item</button>
      </div>
  
      <div className="form-section">
        <h3>Search</h3>
  
        <input 
          placeholder="Search by name..." 
          onChange={e => setSearch(e.target.value)} 
        />
  
        <button onClick={searchItems}>Search</button>
        <button onClick={fetchItems}>Reset</button>
      </div>
  
      <div className="items">
        <h3>All Items</h3>
  
        {items.map(item => (
          <div key={item._id} className="item-card">
            <b>{item.itemName}</b> [{item.type}] — {item.location}
            <br/>
            {item.description} | Contact: {item.contactInfo}
            <br/>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>
  
    </div>
  );
}