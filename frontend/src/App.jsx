import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard';
import Home from './components/Home/Home';
import EmployeeList from './pages/EmployeeList';
import CreateEmployee from './pages/CreateEmployee';
import Header from './components/Header/Header'; // Import Header component

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/', '/signup']; // Include '/' to hide the header on the login page

  return (
    <div>
      {/* Conditionally render the Header component based on the current path */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Set root route to render LoginPage */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} /> {/* Default child route for /dashboard */}
          <Route path="employeelist" element={<EmployeeList />} /> {/* Nested route for EmployeeList */}
        </Route>
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/createemployee" element={<CreateEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
