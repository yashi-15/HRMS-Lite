function ConfirmPopUp({ onClose, onConfirm, title, message }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-700 rounded-lg p-6 w-96 border border-zinc-600">
        <h2 className="text-xl font-semibold text-pink-200 mb-4">
          {title}
        </h2>
        <p className="text-gray-300 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-600 hover:bg-zinc-500 text-white rounded font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopUp;