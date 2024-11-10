// CreateEmployee.js
import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

function CreateEmployee() {
  const { addEmployee } = useContext(UserContext);

  const [employeeData, setEmployeeData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "HR",
    f_gender: "Male",
    f_Course: [],
    f_Image: null,
  });

  // Handle changes for input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  // Handle checkbox change for courses
  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      f_Course: checked
        ? [...prevData.f_Course, value]
        : prevData.f_Course.filter((course) => course !== value),
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setEmployeeData({ ...employeeData, f_Image: e.target.files[0] });
  };

  // Submit the form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEmployee(employeeData);
    setEmployeeData({
      f_Name: "",
      f_Email: "",
      f_Mobile: "",
      f_Designation: "HR",
      f_gender: "Male",
      f_Course: [],
      f_Image: null,
    });
  };

  return (
    <div className="flex items-center justify-center mt-2 bg-gray-50 px-4 sm:px-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Create Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="f_Name"
              value={employeeData.f_Name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="f_Email"
              value={employeeData.f_Email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700">Mobile</label>
            <input
              type="text"
              name="f_Mobile"
              value={employeeData.f_Mobile}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-gray-700">Designation</label>
            <select
              name="f_Designation"
              value={employeeData.f_Designation}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700">Gender</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="f_gender"
                  value="Male"
                  checked={employeeData.f_gender === "Male"}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="f_gender"
                  value="Female"
                  checked={employeeData.f_gender === "Female"}
                  onChange={handleInputChange}
                />
                Female
              </label>
            </div>
          </div>

          {/* Courses */}
          <div>
            <label className="block text-gray-700">Courses</label>
            <div className="flex gap-2">
              <label>
                <input
                  type="checkbox"
                  value="MCA"
                  onChange={handleCourseChange}
                  checked={employeeData.f_Course.includes("MCA")}
                />
                MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  value="BCA"
                  onChange={handleCourseChange}
                  checked={employeeData.f_Course.includes("BCA")}
                />
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  value="BSC"
                  onChange={handleCourseChange}
                  checked={employeeData.f_Course.includes("BSC")}
                />
                BSC
              </label>
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              name="f_Image"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            Create Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployee;
