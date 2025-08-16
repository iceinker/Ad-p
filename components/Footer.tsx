import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-purple-700 text-yellow-300 py-6 mt-auto shadow-inner">
      <div className="container mx-auto px-6 text-center text-sm select-none">
        <p>
          &copy; {new Date().getFullYear()} Scholling Platform
        </p>
        <p className="mt-1 opacity-80">
          Crafted with 💛 and and our best efferts
        </p>
      </div>
    </footer>
  );
}
