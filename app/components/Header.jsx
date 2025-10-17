"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../lib/hooks.js";
import { logoutUser } from "../lib/slices/authSlice.js";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button.jsx";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { dispatch, isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-dark text-light shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green rounded-lg flex items-center justify-center">
              <span className="text-light font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold">Product Manager</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Products</Link>
            </Button>
            <Button asChild variant="default" size="sm">
              <Link href="/products/new">Add Product</Link>
            </Button>
            {isAuthenticated && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-light text-sm">
                  Welcome, {user?.email || "User"}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  className="border-beige text-beige hover:bg-beige hover:text-dark"
                >
                  {isLoading ? "Logging out..." : "Logout"}
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-light hover:text-beige transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <div className="flex flex-col space-y-3 pt-4">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="justify-start"
              >
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Products
                </Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link
                  href="/products/new"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Add Product
                </Link>
              </Button>
              {isAuthenticated && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </Button>
              )}

              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="text-light text-sm px-3 py-2 bg-gray-800 rounded-lg">
                    Welcome, {user?.email || "User"}
                  </div>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                    className="w-full border-beige text-beige hover:bg-beige hover:text-dark"
                  >
                    {isLoading ? "Logging out..." : "Logout"}
                  </Button>
                </div>
              ) : (
                <Button asChild variant="outline" size="sm">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
