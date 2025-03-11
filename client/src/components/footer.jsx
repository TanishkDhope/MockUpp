"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Twitch } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Laptops", href: "/products" },
        { name: "Keyboards", href: "/products" },
        { name: "Mice", href: "/products" },
        { name: "Audio", href: "/products" },
        { name: "Accessories", href: "/products" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/products" },
        { name: "Warranty", href: "/products" },
        { name: "Returns", href: "/products" },
        { name: "Contact Us", href: "/products" },
        { name: "Product Guides", href: "/products" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/products" },
        { name: "Careers", href: "/products" },
        { name: "News", href: "/products" },
        { name: "Press", href: "/products" },
        { name: "Investors", href: "/products" },
      ],
    },
  ];

  return (
    <footer className="bg-black/90 border-t border-green-500/20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                RAZER
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              For Gamers. By Gamers. The premier lifestyle brand for gamers.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Twitch className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-white font-bold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-400 hover:text-green-500 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Razer Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <Link to="#" className="hover:text-green-500 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-green-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-green-500 transition-colors">
              Cookie Settings
            </Link>
            <Link to="#" className="hover:text-green-500 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}