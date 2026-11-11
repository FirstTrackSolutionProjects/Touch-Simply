import React from "react";
import { AlertTriangle, X } from "lucide-react";

const DeleteConfirmationModal = ({ open, itemType, loading, onCancel, onConfirm }) => {
  if (!open) return null;

  const label = itemType === "download" ? "download" : "resume";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onCancel();
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-brand-red">
              <AlertTriangle size={22} />
            </span>
            <div>
              <h2 id="delete-confirmation-title" className="text-lg font-bold text-gray-900">
                Remove {label}?
              </h2>
              <p id="delete-confirmation-description" className="mt-2 text-sm leading-6 text-gray-600">
                This {label} will be removed from your list. The owner can restore it from the Trash, so it won’t be permanently deleted.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            aria-label="Close confirmation"
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Keep {label}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? "Removing…" : `Remove ${label}`}
          </button>
        </div>
      </section>
    </div>
  );
};

export default DeleteConfirmationModal;
