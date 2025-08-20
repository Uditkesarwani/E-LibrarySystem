

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { host } from '../../Host';

function Signup() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    password: ''
  });
  const [status, setStatus] = useState('');

  

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(`${host}/auth/getStudent`);
        console.log(response.data);
      } catch (err) {
        console.log('Error:', err);
      }
    };
    fetchApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${host}/auth/signupStudent`, form, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setStatus(response.data.msg);
        navigate('/login');
      }else{
      console.log(response.data);
       setMsg(response.data.msg)
      }
    } catch (err) {
      
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl "
      >
        <h1 className="text-3xl font-bold text-center text-blue-600">Signup</h1>
  <p className='text-red-500'>{msg}</p>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Enter your name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={form.name}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Gender</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="male" onChange={handleChange} required/>
              Male
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="female" onChange={handleChange} required/>
              Female
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={form.address}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            value={form.phone}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex justify-between gap-4 mt-2">
          <input
            type="submit"
            value="Signup"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          />
          <input
            type="reset"
            value="Reset"
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition"
          />
        </div>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
