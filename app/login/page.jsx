"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../components/Input.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useAuth } from "../lib/hooks.js";
import { loginUser, clearError } from "../lib/slices/authSlice.js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Simplified login form validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export default function LoginPage() {
  const router = useRouter();
  const { dispatch, isLoading, error, isAuthenticated } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // Clear error when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Show error toast when there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      // Error is handled by the auth slice and useEffect
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <Image
            src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
            alt="Login Background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-dark/20"></div>

          {/* Content overlay */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
            <div className="w-20 h-20 bg-green/90 rounded-3xl flex items-center justify-center shadow-2xl mb-8">
              <span className="text-white font-bold text-3xl">P</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Product Manager
            </h1>
            <p className="text-xl text-gray-200 max-w-md">
              Streamline your product management workflow with our intuitive
              platform. Manage, track, and optimize your inventory effortlessly.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Mobile Header - Only visible on mobile/tablet */}
            <div className="lg:hidden text-center">
              <h2 className="mt-6 text-3xl font-bold text-dark">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to your Product Manager account
              </p>
            </div>

            {/* Desktop Header - Only visible on desktop */}
            <div className="hidden lg:block">
              <h2 className="text-3xl font-bold text-dark mb-2">
                Sign in to your account
              </h2>
              <p className="text-gray-600">
                Enter your email address to continue
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <Input
                  {...register("email")}
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                  error={errors.email?.message}
                  required
                  icon={
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  }
                  inputClassName="py-4 text-lg"
                />

                {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="default"
                    size="xl"
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-light mr-2"></div>
                        Signing in...
                      </>
                    ) : (
                      "Continue with Email"
                    )}
                  </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    className="w-full"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="ml-2">Google</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    className="w-full"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="ml-2">Facebook</span>
                  </Button>
                </div>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-green hover:text-green/80 transition-colors"
                  >
                    Sign up for free
                  </a>
                </p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-500 hover:text-green transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Product Manager
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
