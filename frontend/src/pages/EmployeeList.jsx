import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContextProvider";

function EmployeeList() {
  const { employees, deleteEmployee, updateEmployee } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredEmployees = employees.filter((employee) =>
    employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.f_Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.f_Mobile.includes(searchTerm) ||
    employee.f_Designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.f_gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.f_Course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEmployeeData({ ...editEmployeeData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const saveUpdatedEmployee = () => {
    const updatedEmployee = { ...editEmployeeData };

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedEmployee.f_Image = reader.result; // Set base64 image data
        updateEmployee(editEmployeeData._id, updatedEmployee);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      updateEmployee(editEmployeeData._id, updatedEmployee);
    }
    setShowEditForm(false);
    setSelectedImage(null);
  };

  const editEmployee = (employee) => {
    setEditEmployeeData(employee);
    setShowEditForm(true);
  };

  return (
    <div className="m-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Employee List</h2>
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {showEditForm && (
        <div className="mb-4 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-xl font-semibold mb-2">Edit Employee</h3>
          <div className="mb-2">
            <input name="f_Name" value={editEmployeeData.f_Name} onChange={handleEditChange} placeholder="Name" className="px-2 py-1 border rounded-md w-full" />
          </div>
          <div className="mb-2">
            <input name="f_Email" value={editEmployeeData.f_Email} onChange={handleEditChange} placeholder="Email" className="px-2 py-1 border rounded-md w-full" />
          </div>
          <div className="mb-2">
            <input name="f_Mobile" value={editEmployeeData.f_Mobile} onChange={handleEditChange} placeholder="Mobile" className="px-2 py-1 border rounded-md w-full" />
          </div>
          <div className="mb-2">
            <input name="f_Designation" value={editEmployeeData.f_Designation} onChange={handleEditChange} placeholder="Designation" className="px-2 py-1 border rounded-md w-full" />
          </div>
          <div className="mb-2">
            <input name="f_gender" value={editEmployeeData.f_gender} onChange={handleEditChange} placeholder="Gender" className="px-2 py-1 border rounded-md w-full" />
          </div>
          <div className="mb-2">
            <input name="f_Course" value={editEmployeeData.f_Course} onChange={handleEditChange} placeholder="Course" className="px-2 py-1 border rounded-md w-full" />
          </div>
          <div className="mb-2">
            <input type="file" onChange={handleImageChange} className="px-2 py-1 border rounded-md w-full" />
          </div>
          <button onClick={saveUpdatedEmployee} className="px-4 py-2 bg-red-500 text-white rounded-md">Save</button>
          <button onClick={() => setShowEditForm(false)} className="ml-2 px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">ID</th>
              <th className="px-6 py-4 font-medium text-gray-900">Image</th>
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th className="px-6 py-4 font-medium text-gray-900">Email</th>
              <th className="px-6 py-4 font-medium text-gray-900">Mobile</th>
              <th className="px-6 py-4 font-medium text-gray-900">Designation</th>
              <th className="px-6 py-4 font-medium text-gray-900">Gender</th>
              <th className="px-6 py-4 font-medium text-gray-900">Course</th>
              <th className="px-6 py-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {filteredEmployees.map((employee) => (
              <tr key={employee._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{employee._id}</td>
                <td className="px-6 py-4">
                  <img src={employee.f_Image} alt={employee.f_Name} className="w-16 h-16 object-cover rounded-full" />
                </td>
                <td className="px-6 py-4">{employee.f_Name}</td>
                <td className="px-6 py-4">{employee.f_Email}</td>
                <td className="px-6 py-4">{employee.f_Mobile}</td>
                <td className="px-6 py-4">{employee.f_Designation}</td>
                <td className="px-6 py-4">{employee.f_gender}</td>
                <td className="px-6 py-4">{employee.f_Course}</td>
                <td className="px-6 py-4">
                  <button onClick={() => editEmployee(employee)} className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md">Edit</button>
                  <button onClick={() => deleteEmployee(employee._id)} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
