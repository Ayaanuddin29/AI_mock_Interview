"use client"
import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub,FaInstagram } from "react-icons/fa";

const About = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg z-10">
        <img
          src="/about.jpeg" // Replace with your actual image path
          alt="Developer"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mt-4">Khaja Ayaanuddin</h1>
      <h2 className="text-xl text-gray-800 text-center font-semibold max-w-lg mt-2">
        This application is made for practice before going to an actual interview and is completely free of cost.
      </h2>
      <p className="text-gray-800 text-center max-w-md mt-4">
        Full-Stack Developer & Data Analyst | MERN Stack | Redux | Salesforce Enthusiast. Passionate about building scalable web applications.
      </p>
      <div className="flex space-x-6 mt-4">
        <a href="https://linkedin.com/in/khaja-ayaanuddin-7553a1240/" target="_blank" rel="noopener noreferrer" className="text-gray-900 text-2xl hover:text-gray-600">
          <FaLinkedin />
        </a>
        <a href="https://github.com/Ayaanuddin29" target="_blank" rel="noopener noreferrer" className="text-gray-900 text-2xl hover:text-gray-600">
          <FaGithub />
        </a>
        <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-900 text-2xl hover:text-gray-600">
          <FaInstagram />
        </a>
      </div>
      <p className="text-gray-800 text-center max-w-md mt-4">
        Currently pursuing my final year in Computer Science. Passionate about technology, open-source contributions, and continuous learning.
      </p>
    </motion.div>
  );
};

export default About;