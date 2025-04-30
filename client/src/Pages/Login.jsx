import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };
  
  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };
  
  return (
    <div className="py-5 w-full flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="px-6 py-8 sm:px-8 bg-white rounded-lg shadow-md">
          {!showForgotPassword ? (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Welcome Back</h1>
              
              {/* Google Login Button */}
              <button className="w-full border border-gray-200 bg-white hover:bg-gray-50 transition-all py-2.5 rounded-md flex items-center justify-center gap-2 mb-6">
                <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"/>
                  <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"/>
                  <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"/>
                  <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"/>
                </svg>
                <span className="font-medium text-sm">Continue with Google</span>
              </button>
              
              {/* Divider */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-gray-200 absolute w-full"></div>
                <span className="bg-white px-3 text-xs text-gray-500 relative">Or use email</span>
              </div>
              
              {/* Login/Signup Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button 
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 text-sm transition-all ${isLogin ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                >
                  Log In
                </button>
                
                <button 
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 text-sm transition-all ${!isLogin ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                >
                  Sign Up
                </button>
              </div>
              
              {/* Form Fields */}
              <form className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 block mb-1.5" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black transition-all"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-700 block mb-1.5" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black transition-all"
                  />
                </div>
                
                {!isLogin && (
                  <div>
                    <label className="text-sm text-gray-700 block mb-1.5" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black transition-all"
                    />
                  </div>
                )}
                
                {isLogin && (
                  <div className="flex justify-end">
                    <button 
                      type="button"
                      className="text-xs text-gray-600 hover:text-black transition-all"
                      onClick={handleForgotPasswordClick}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-900 transition-all text-sm font-medium mt-2"
                >
                  {isLogin ? "Log In" : "Sign Up"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Reset Password</h1>
              
              <form className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 block mb-1.5" htmlFor="resetEmail">
                    Email
                  </label>
                  <input
                    id="resetEmail"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black transition-all"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-700 block mb-1.5" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black transition-all"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-700 block mb-1.5" htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmNewPassword"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black transition-all"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-900 transition-all text-sm font-medium mt-2"
                >
                  Reset Password
                </button>
                
                <div className="text-center mt-4">
                  <button 
                    type="button"
                    className="text-xs text-gray-600 hover:text-black transition-all"
                    onClick={handleBackToLogin}
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;