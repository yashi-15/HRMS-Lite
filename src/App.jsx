import { useState } from 'react';
import './App.css'
import AddPopUp from './components/AddPopUp';
import ConfirmPopUp from './components/ConfirmDelete';
import AttendancePopUp from './components/AttendancePopUp';

function App() {
  const initialEmployees = [
    {
      employeeId: "EMP001",
      name: "Amit Sharma",
      email: "amit.sharma@gmail.com",
      designation: "Software Engineer",
      department: "IT",
    },
    {
      employeeId: "EMP002",
      name: "Priya Verma",
      email: "pri.verma@gmail.com",
      designation: "HR Manager",
      department: "Human Resources",
    },
    {
      employeeId: "EMP003",
      name: "Rohit Singh",
      email: "singhrohit4@gmail.com",
      designation: "Business Analyst",
      department: "Operations",
    },
    {
      employeeId: "EMP004",
      name: "Sneha Kapoor",
      email: "sneha122@gmail.com",
      designation: "UI/UX Designer",
      department: "Design",
    },
    {
      employeeId: "EMP005",
      name: "Vikram Mehta",
      email: "v.mehta12@gmail.com",
      designation: "Project Manager",
      department: "Management",
    }
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [addEmployee, setAddEmployee] = useState(false);
  const [showAttendancePopup, setShowAttendancePopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleOnSubmit = (employeeData) => {
    setEmployees([...employees, employeeData]);
  };

  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployees(prev => {
      if (prev.includes(employeeId)) {
        return prev.filter(id => id !== employeeId);
      } else {
        return [...prev, employeeId];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(employees.map(emp => emp.employeeId));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleMarkAttendance = () => {
    setShowAttendancePopup(true);
  };

  const handleAttendanceSubmit = (attendanceData) => {
    console.log('Marking attendance for:', selectedEmployees);
    console.log('Attendance data:', attendanceData);
    // Add your attendance logic here
    alert(`Attendance marked as ${attendanceData.status} on ${attendanceData.date} for ${selectedEmployees.length} employee(s)`);
    setSelectedEmployees([]);
  };

  const handleDeleteEmployees = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setEmployees(employees.filter(emp => !selectedEmployees.includes(emp.employeeId)));
    setSelectedEmployees([]);
    setShowDeleteConfirm(false);
  };

  return (
    <div className='bg-zinc-800 min-h-screen'>
      <h1 className='text-pink-200 font-semibold text-2xl text-center py-5 border-b border-zinc-600'>HRMS</h1>

      <div className='flex justify-between items-center mx-4 my-4'>
        {selectedEmployees.length > 0 ? (
          <div className='flex gap-3'>
            <span className='text-pink-200 font-medium self-center'>
              {selectedEmployees.length} selected
            </span>

          </div>
        ) : (
          <div></div>
        )}
        <div className='flex gap-2'>
          <button
            className={`${selectedEmployees.length > 0 ? "bg-green-600 hover:bg-green-700 text-white":"bg-zinc-700 text-zinc-800"} px-4 py-2 rounded-sm font-semibold transition-colors`}
            onClick={handleMarkAttendance}
            disabled={!selectedEmployees.length > 0}
          >
            Mark Attendance
          </button>
          <button
            className={`${selectedEmployees.length > 0 ? "bg-red-600 hover:bg-red-700 text-white":"bg-zinc-700 text-zinc-800"} px-4 py-2 rounded-sm font-semibold transition-colors`}
            onClick={handleDeleteEmployees}
            disabled={!selectedEmployees.length > 0}
          >
            Delete Employee{selectedEmployees.length > 1 ? 's' : ''}
          </button>
          <button
            className='bg-purple-600 hover:bg-purple-700 p-2 px-4 rounded-sm font-semibold text-white transition-colors'
            onClick={() => setAddEmployee(true)}
          >
            Add New Employee
          </button>
        </div>

      </div>

      <div className="overflow-x-auto mx-4">
        <table className="min-w-full border border-gray-600 divide-y divide-gray-600">
          <thead className="bg-zinc-600">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-pink-200">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedEmployees.length === employees.length && employees.length > 0}
                  className='cursor-pointer'
                />
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-pink-200">Employee ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-pink-200">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-pink-200">Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-pink-200">Designation</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-pink-200">Department</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {employees.map((emp) => (
              <tr
                key={emp.employeeId}
                className={`hover:bg-zinc-900 transition-colors ${selectedEmployees.includes(emp.employeeId) ? 'bg-zinc-700' : ''
                  }`}
              >
                <td className="px-4 py-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(emp.employeeId)}
                    onChange={() => handleSelectEmployee(emp.employeeId)}
                    className='cursor-pointer'
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-300">{emp.employeeId}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{emp.name}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{emp.email}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{emp.designation}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{emp.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addEmployee && <AddPopUp onClose={() => setAddEmployee(false)} onSubmit={handleOnSubmit} />}
      {showAttendancePopup && (
        <AttendancePopUp
          onClose={() => setShowAttendancePopup(false)} 
          onSubmit={handleAttendanceSubmit}
          selectedCount={selectedEmployees.length}
        />
      )}
      {showDeleteConfirm && (
        <ConfirmPopUp
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDelete}
          title="Confirm Delete"
          message={`Are you sure you want to delete ${selectedEmployees.length} employee${selectedEmployees.length > 1 ? 's' : ''}?`}
        />
      )}
    </div>
  )
}

export default App