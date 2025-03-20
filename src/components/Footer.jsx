import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa"; // Import relevant icons

const Footer = () => {
  return (
    <footer className="bg-[#2D3748] text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Me</h3>
            <p className="text-sm">
              Hi, I’m Kanat — a front-end developer passionate about crafting
              accessible, high-performance user interfaces. I love blending
              thoughtful design with robust engineering to create seamless
              digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="https://kanatosmon.com/"
                  target="_blank"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact and Social Media Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
            <ul className="space-y-2">
              <li className="text-sm flex items-center">
                <FaEnvelope className="mr-2" />
                <a
                  href="mailto:your.email@example.com"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  kanat.osmon.webdev@gmail.com
                </a>
              </li>
              <li className="text-sm flex items-center">
                <FaLinkedin className="mr-2" />
                <a
                  href="https://linkedin.com/in/kanat-osmon-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-sm flex items-center">
                <FaGithub className="mr-2" />
                <a
                  href="https://github.com/osmonov-k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-500 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Kanat Osmon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
