import { useState } from 'react';

function AttendancePopUp({ onClose, onSubmit, selectedCount }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Present');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-700 rounded-lg p-6 w-96 border border-zinc-600">
        <h2 className="text-xl font-semibold text-pink-200 mb-4">
          Mark Attendance
        </h2>
        <p className="text-gray-300 mb-4 text-sm">
          Marking attendance for {selectedCount} employee{selectedCount > 1 ? 's' : ''}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-pink-200 text-sm font-semibold mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-600 border border-zinc-500 rounded text-gray-200 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-pink-200 text-sm font-semibold mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-600 border border-zinc-500 rounded text-gray-200 focus:outline-none focus:border-purple-500"
              required
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-600 hover:bg-zinc-500 text-white rounded font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition-colors"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AttendancePopUp;