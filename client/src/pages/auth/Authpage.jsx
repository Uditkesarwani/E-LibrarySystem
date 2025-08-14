import React, { useEffect } from 'react'
import Signup from './Signup'
import Login from './Login'
import axios from 'axios'
import { Link} from 'react-router-dom'
import { host } from '../../Host'



const Authpage = () => {
 useEffect(() => {
  const fetchApi = async () => {
    try {
      const response = await axios.get(`${host}/auth/getStudent`);
      console.log(response.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  fetchApi();
}, []);

  return (
    <div>
      <Signup/>
    </div>
  )
}

export default Authpage
