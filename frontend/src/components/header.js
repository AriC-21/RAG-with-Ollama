import React from "react";
import Link from 'next/link';

const Header = ({ title }) => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center overflow-hidden mr-2">
              <img src="/logo.png" alt="Logo" className="h-12 w-12" />
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
          <nav>
            <Link href="/" className="text-white px-4 hover:text-gray-200">
              Home
            </Link>
            <Link
              href="/chat"
              className="text-white px-4 hover:text-gray-200"
            >
              Chat with PDF
            </Link>
            <Link href="#contact" className="text-white px-4 hover:text-gray-200">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
