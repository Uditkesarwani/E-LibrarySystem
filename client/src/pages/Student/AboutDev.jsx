import React from 'react'
import Udit from '/src/assets/udit1.jpg'
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import StudentRouters from '../Routes/StudentRouters';


const AboutDev = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <StudentRouters />

      <div className="flex flex-col items-center justify-center px-4 py-2">
        <div className="backdrop-blur-md bg-white/20 shadow-xl rounded-2xl p-8 md:p-12 max-w-lg w-full text-center border border-white/30">
          <div className="flex justify-center">
            <img
              src={Udit}
              alt="Udit Kesarwani"
              className="w-52 h-52 rounded-full border-4 border-white shadow-lg object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

       
          <h1 className="text-3xl font-bold text-white mt-4">
            Udit Kesarwani
          </h1>
          <p className="text-gray-200 text-lg">BCA Student</p>

        
          <div className="mt-6 flex flex-col gap-4">
            <a
              href="https://github.com/Uditkesarwani"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <FaGithub size={22} /> github.com/Uditkesarwani
            </a>

            <a
              href="https://www.linkedin.com/in/udit-kesarwani-178b952b4/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <FaLinkedin size={22} /> linkedin.com/in/udit-kesarwani
            </a>

            <a
              href="https://aboutudit.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <FaGlobe size={22} /> aboutudit.netlify.app
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutDev
