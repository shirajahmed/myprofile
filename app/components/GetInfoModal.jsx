"use client";

export default function InfoModal({ title, info, onClose }) {
  if (!info) return null;

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#18191d] p-6 overflow-auto rounded-lg shadow-xl max-w-md w-full max-h-screen">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <pre className="text-sm text-white ">
          {JSON.stringify(info, null, 2)}
        </pre>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-[#a65fa8] text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
