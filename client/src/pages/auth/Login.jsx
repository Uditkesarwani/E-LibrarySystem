import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { host } from '../../Host';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.select.value === 'plz select') {
      return alert('Please select a role');
    } else {
      try {
        const response = await axios.post(`${host}/auth/login`, form, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.data.success) {
          sessionStorage.setItem('id', response.data.id);
          

          navigate(`/${response.data.route}`);
        } else {
          setMsg(response.data.msg)
          console.log(response.data);
        }

      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h1>
        <p className='text-red-500'>{msg}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              name="select"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-blue-300"
            >
              <option>plz select</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-between items-center space-x-4">
            <input
              type="submit"
              value="Login"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer transition duration-200"
            />
            <input
              type="reset"
              value="Reset"
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md cursor-pointer transition duration-200"
            />
          </div>
        </form>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
