import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  // Function to handle login
  const loginUser = async (email, password, navigate) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("http://localhost:3001/login", {
        f_Email: email,
        f_Pwd: password,
      });

      if (data) {
        setUser(data);
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle signup
  const signupUser = async (username, email, password, navigate) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3001/signup", {
        f_userName: username,
        f_Email: email,
        f_Pwd: password,
      });

      if (response.data.message) {
        alert("Registration successful!");
        navigate("/");
      } else {
        setError(response.data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getEmployees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Function to add a new employee
  const addEmployee = async (employeeData) => {
    const formData = new FormData();
    Object.entries(employeeData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, value.join(","));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const { data } = await axios.post("http://localhost:3001/addEmployee", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(data.message || "Employee created successfully!");
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Try again.");
    }
  };

  // Function to update an employee
  const updateEmployee = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3001/updateEmployee/${id}`, updatedData);
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp._id === response.data._id ? response.data : emp))
      );
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Function to delete an employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteEmployee/${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
      alert("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <UserContext.Provider value={{ user, error, loading, loginUser, signupUser, employees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
