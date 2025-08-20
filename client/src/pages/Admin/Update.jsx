import axios from 'axios';
import React from 'react'
import { useEffect , useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { host } from '../../Host';

const Update = () => {
  const navigate = useNavigate()
  const data = useParams();
 
  
  let [bid, setBid] = useState('')
  const [book, setBook] = useState([])
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
     
      console.log(form);
      
      const formData = new FormData();
  
      formData.append("id", form.id);
      formData.append("title", form.title);
      formData.append("author", form.author);
      formData.append("catogory", form.catogory);
      formData.append("copy", form.copy);
      formData.append("image", form.image);
  
      try {
        const response = await axios.post(`${host}/admin/update-book/${data._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if(response.data.success){
 alert("Book Updated successfully!");
 navigate('/viewBook')
        }
        // console.log(response.data);
       
        
      } catch (err) {
        console.error(err);
        alert("Error uploading book");
      }
    };

   useEffect(()=>{
    
   const fetchUpdata = async()=>{
    const response = await axios.get(`${host}/admin/update-book/${data._id}`)
    if(response.data.success){
      setBook(response.data.book)
      console.log(response.data)
      setBid(response.data.book.id)
    }
   }
   fetchUpdata()
   },[])
  return (
    <div>
    <div className="min-h-screen">
         {
           <div
            key={book._id}
            className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col gap-2 "
          >
            <p className="text-lg font-semibold text-gray-800">Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Copies: {book.copy}</p>
            <p>Category: {book.catogory}</p>
            <p>image: {book.image}</p>
            
             <p className="text-sm text-gray-500">Book ID: {bid}</p>
            </div>
         }

                 <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600 mt-6">Update Book</h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 px-22">
          <div>
            <label className="block mb-1 font-medium">Book ID</label>
            <input type="text" name="id" onChange={handleChange} className="w-full border rounded px-3 py-2"  value={bid.slice(0,3)}/>
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
              value="Update Book"
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
  )
}

export default Update
