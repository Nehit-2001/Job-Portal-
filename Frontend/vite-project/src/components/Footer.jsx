import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-12 mt-16">

      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        {/* Services */}
        <div>
          <h2 className="font-semibold text-gray-500 mb-4 tracking-widest text-sm">
            SERVICES
          </h2>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-blue-600 transition">Branding</Link></li>
            <li><Link to="/" className="hover:text-blue-600 transition">Design</Link></li>
            <li><Link to="/" className="hover:text-blue-600 transition">Marketing</Link></li>
            <li><Link to="/" className="hover:text-blue-600 transition">Advertisement</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="font-semibold text-gray-500 mb-4 tracking-widest text-sm">
            COMPANY
          </h2>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-blue-600 transition">About us</Link></li>
            <li><Link to="/" className="hover:text-blue-600 transition">Contact</Link></li>
            <li><Link to="/jobs" className="hover:text-blue-600 transition">Jobs</Link></li>
            <li><Link to="/" className="hover:text-blue-600 transition">Press kit</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="font-semibold text-gray-500 mb-4 tracking-widest text-sm">
            LEGAL
          </h2>
          <ul className="space-y-3 text-sm">
            <li><Link to="/termsofuse" className="hover:text-blue-600 transition">Terms of use</Link></li>
            <li><Link to="/privacypolicy" className="hover:text-blue-600 transition">Privacy policy</Link></li>
            <li><Link to="/" className="hover:text-blue-600 transition">Cookie policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-8"></div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5 pb-6 text-center md:text-left">

        {/* Left - Branding */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-[#2777e7de]">mN</span>
          <div>
            <h3 className="font-semibold text-sm">Mohit Negi Creation</h3>
            <p className="text-xs text-gray-500">
              Copyright © 2026 — All rights reserved by Mohit Negi.
            </p>
          </div>
        </div>

        {/* Right - Social Icons */}
        <div className="flex gap-5 items-center">

          {/* Twitter/X */}
          <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-blue-500 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a href="#" aria-label="YouTube" className="text-gray-500 hover:text-red-500 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-blue-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

        </div>
      </div>

    </footer>
  );
};

export default Footer;