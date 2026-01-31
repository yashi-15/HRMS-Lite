import { useState } from 'react';

function EmployeeAttendanceView({ employee, attendanceRecords, onClose }) {
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const employeeRecords = attendanceRecords.filter(
    record => record.employeeId === employee.employeeId
  );

  const filteredRecords = employeeRecords.filter(record => {
    const matchesMonth = filterMonth === 'all' || 
      new Date(record.date).getMonth() === parseInt(filterMonth);
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesMonth && matchesStatus;
  });

  const presentCount = employeeRecords.filter(r => r.status === 'Present').length;
  const absentCount = employeeRecords.filter(r => r.status === 'Absent').length;
  const totalRecords = employeeRecords.length;
  const attendancePercentage = totalRecords > 0 
    ? ((presentCount / totalRecords) * 100).toFixed(1) 
    : 0;

  const sortedRecords = [...filteredRecords].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden border border-zinc-600">
        <div className="bg-zinc-600 p-6 border-b border-zinc-500">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-pink-200 mb-2">
                Attendance Record
              </h2>
              <div className="text-gray-300">
                <p className="font-semibold text-lg">{employee.name} - {employee.employeeId}</p>
                <p className="text-sm">{employee.designation} - {employee.department}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white text-2xl font-bold transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="bg-zinc-600 p-4 border-b border-zinc-500">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-zinc-700 p-3 rounded">
              <p className="text-gray-400 text-xs mb-1">Total Records</p>
              <p className="text-2xl font-bold text-pink-200">{totalRecords}</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <p className="text-gray-400 text-xs mb-1">Present</p>
              <p className="text-2xl font-bold text-green-400">{presentCount}</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <p className="text-gray-400 text-xs mb-1">Absent</p>
              <p className="text-2xl font-bold text-red-400">{absentCount}</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <p className="text-gray-400 text-xs mb-1">Attendance %</p>
              <p className="text-2xl font-bold text-purple-400">{attendancePercentage}%</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-zinc-600 border-b border-zinc-500">
          <div className="flex gap-4 justify-end">
            <div className="">
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-500 rounded text-gray-200 focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Months</option>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
            </div>
            <div className="">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-500 rounded text-gray-200 focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 400px)' }}>
          {sortedRecords.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-zinc-600 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-pink-200">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-pink-200">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-pink-200">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {sortedRecords.map((record, index) => {
                  const date = new Date(record.date);
                  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                  const formattedDate = date.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  });

                  return (
                    <tr key={index} className="hover:bg-zinc-600 transition-colors">
                      <td className="px-6 py-3 text-sm text-gray-300">
                        {formattedDate}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-300">
                        {dayName}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          record.status === 'Present' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-red-600 text-white'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <p className="text-lg">No attendance records found</p>
              <p className="text-sm mt-2">
                {filterMonth !== 'all' || filterStatus !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Start marking attendance to see records here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeAttendanceView;