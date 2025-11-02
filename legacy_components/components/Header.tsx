"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [showTemplates, setShowTemplates] = useState(false);
  const [showResources, setShowResources] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              v0
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <button
                className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
                onMouseEnter={() => setShowTemplates(true)}
                onMouseLeave={() => setShowTemplates(false)}
              >
                Templates
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <div className="relative group">
              <button
                className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
                onMouseEnter={() => setShowResources(true)}
                onMouseLeave={() => setShowResources(false)}
              >
                Resources
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <Link
              href="/enterprise"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Enterprise
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/ios"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              iOS
            </Link>
            <Link
              href="/students"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Students
            </Link>
            <Link
              href="/faq"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/signin"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-black bg-white hover:bg-gray-100 rounded-md transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

