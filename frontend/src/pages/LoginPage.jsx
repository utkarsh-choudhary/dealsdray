import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading, loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    loginUser(email, password, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <div>
            <img src="../dealsdray.png" alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome</h2>
          <p className="text-gray-500 text-center text-sm sm:text-base">
            Sign in to access your account.
          </p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="button"
          className="w-full bg-red-600 text-white font-medium py-2 px-4 rounded-md hover:bg-red-700 transition"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-6 flex items-center justify-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
