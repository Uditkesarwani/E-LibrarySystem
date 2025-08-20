import React, { useState } from 'react';
import AdminRouters from '../Routes/AdminRouters';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { host } from '../../Host';

const Dashboard = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: '',
    title: '',
    author: '',
    catogory: '',
    copy: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("id", form.id);
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("catogory", form.catogory);
    formData.append("copy", form.copy);
    formData.append("image", form.image);

    try {
      const response = await axios.post(`${host}/admin/add-book`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response.data);
      alert("Book added successfully!");
       navigate('/viewBook')

    } catch (err) {
      console.error(err);
      alert("Error uploading book");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <AdminRouters />
      <div className="max-w-2xl mx-auto bg-white mt-2 shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">Add New Book</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="">
          <div>
            <label className="block mb-1 font-medium">Book ID</label>
            <input type="text" name="id" onChange={handleChange} className="w-full border rounded px-3 py-2" required/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Book Title</label>
            <input type="text" name="title" onChange={handleChange} className="w-full border rounded px-3 py-2" required/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Author</label>
            <input type="text" name="author" onChange={handleChange} className="w-full border rounded px-3 py-2" required/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input type="text" name="catogory" onChange={handleChange} className="w-full border rounded px-3 py-2" required/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Copies</label>
            <input type="text" name="copy" onChange={handleChange} className="w-full border rounded px-3 py-2" required/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Book Cover Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full" required/>
          </div>

          <div className="flex justify-between mt-6">
            <input
              type="submit"
              value="Add Book"
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            />
            <input
              type="reset"
              value="Reset"
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
