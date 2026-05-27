import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-12">

      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Services */}
        <div>
          <h2 className="font-semibold text-gray-500 mb-4 tracking-wide">
            SERVICES
          </h2>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-black">Branding</Link></li>
            <li><Link to="/" className="hover:text-black">Design</Link></li>
            <li><Link to="/" className="hover:text-black">Marketing</Link></li>
            <li><Link to="/" className="hover:text-black">Advertisement</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="font-semibold text-gray-500 mb-4 tracking-wide">
            COMPANY
          </h2>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-black">About us</Link></li>
            <li><Link to="/" className="hover:text-black">Contact</Link></li>
            <li><Link to="/" className="hover:text-black">Jobs</Link></li>
            <li><Link to="/" className="hover:text-black">Press kit</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="font-semibold text-gray-500 mb-4 tracking-wide">
            LEGAL
          </h2>
          <ul className="space-y-3">
            <li><Link to="/termsofuse" className="hover:text-black">Terms of use</Link></li>
            <li><Link to="/privacypolicy" className="hover:text-black">Privacy policy</Link></li>
            <li><Link to="/" className="hover:text-black">Cookie policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-8"></div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5 pb-6">

        {/* Left */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold">#</span>
          <div>
            <h3 className="font-semibold">Mohit Negi Creation</h3>
            <p className="text-sm text-gray-600">
              Copyright © 2026 - All right reserved by Mohit Negi.
            </p>
          </div>
        </div>

        {/* Right - Social Icons */}
        <div className="flex gap-5">
          <a href="#" className="hover:text-black">
            twitter
          </a>
          <a href="#" className="hover:text-black">
            youtube
          </a>
          <a href="#" className="hover:text-black">
            Facebook
          </a>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
