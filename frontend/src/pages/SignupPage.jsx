import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

function SignupPage() {
  const [formData, setFormData] = useState({
    f_userName: '',
    f_Email: '',
    f_Pwd: '',
  });
  const { error, loading, signupUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { f_userName, f_Email, f_Pwd } = formData;

    // Basic validation
    if (!f_userName || !f_Email || !f_Pwd) {
      alert('Username, email, and password are required.');
      return;
    }

    signupUser(f_userName, f_Email, f_Pwd, navigate);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50 px-4 sm:px-0">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <div>
            <img src="../dealsdray.png" alt="Dawdle" className="w-16 h-16" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">Create your new account</h2>
          <p className="text-gray-500 text-center text-sm sm:text-base">
            Already have an account?{" "}
            <Link to="/" className="text-red-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="f_userName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Username"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="f_Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="f_Pwd"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              required
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-medium py-2 rounded-md hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
