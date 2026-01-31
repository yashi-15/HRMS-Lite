import { useState, useEffect } from 'react';
import './App.css'
import AddPopUp from './components/AddPopUp';
import EmployeeAttendanceView from './components/EmployeeAttendanceView';
import ConfirmDelete from './components/ConfirmDelete';
import AttendancePopUp from './components/AttendancePopUp';
import { employeeAPI, attendanceAPI } from './services/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [addEmployee, setAddEmployee] = useState(false);
  const [showAttendancePopup, setShowAttendancePopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployeeForView, setSelectedEmployeeForView] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeAPI.getAll(true);
      setEmployees(data);
    } catch (err) {
      setError('Failed to load employees. Make sure the backend is running.');
      console.error('Error loading employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSubmit = async (employeeData) => {
    try {
      await employeeAPI.create(employeeData);
      await fetchEmployees();
      setAddEmployee(false);
      alert('Employee added successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to add employee';
      alert(errorMessage);
    }
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

  const handleAttendanceSubmit = async (attendanceData) => {
    try {
      await attendanceAPI.markBulk({
        employeeIds: selectedEmployees,
        date: attendanceData.date,
        status: attendanceData.status,
        markedBy: 'admin',
      });
      
      alert(`Attendance marked as ${attendanceData.status} on ${attendanceData.date} for ${selectedEmployees.length} employee(s)`);
      setSelectedEmployees([]);
      setShowAttendancePopup(false);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to mark attendance';
      alert(errorMessage);
    }
  };

  const handleDeleteEmployees = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await Promise.all(
        selectedEmployees.map(empId => employeeAPI.delete(empId, false))
      );
      
      await fetchEmployees();
      setSelectedEmployees([]);
      setShowDeleteConfirm(false);
      alert('Employees deleted successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to delete employees';
      alert(errorMessage);
    }
  };

  const handleEmployeeNameClick = async (employee) => {
    try {
      const records = await attendanceAPI.getByEmployee(employee.employeeId);
      setSelectedEmployeeForView({ employee, attendanceRecords: records });
    } catch (err) {
      console.error('Error fetching attendance records:', err);
      alert('Failed to load attendance records');
    }
  };

  if (loading) {
    return (
      <div className='bg-zinc-800 min-h-screen flex items-center justify-center'>
        <div className='text-pink-200 text-xl'>Loading employees...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-zinc-800 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-400 text-xl mb-4'>{error}</div>
          <button 
            onClick={fetchEmployees}
            className='bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white font-semibold'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                <td className="px-4 py-2 text-sm text-gray-300">
                  <button
                    onClick={() => handleEmployeeNameClick(emp)}
                    className="text-purple-400 hover:text-purple-300 hover:underline transition-colors font-medium"
                  >
                    {emp.name}
                  </button>
                </td>
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
        <ConfirmDelete
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDelete}
          title="Confirm Delete"
          message={`Are you sure you want to delete ${selectedEmployees.length} employee${selectedEmployees.length > 1 ? 's' : ''}? This action cannot be undone.`}
        />
      )}
      {selectedEmployeeForView && (
        <EmployeeAttendanceView
          employee={selectedEmployeeForView.employee}
          attendanceRecords={selectedEmployeeForView.attendanceRecords}
          onClose={() => setSelectedEmployeeForView(null)}
        />
      )}
    </div>
  )
}

export default App