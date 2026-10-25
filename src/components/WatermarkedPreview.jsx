// Touch-Simply/src/components/WatermarkedPreview.jsx
import React from "react";
import { Download, RefreshCw, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WatermarkedPreview = ({
  previewImageUrls,
  compiling,
  onCompile,
  onDownload,
  downloadDisabled,
  autoCompileEnabled,
  onToggleAutoCompile,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* TOP BUTTON BAR */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onCompile}
            disabled={compiling}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow hover:opacity-90 disabled:opacity-50"
          >
            {compiling ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}
            {compiling ? "Compiling..." : "Compile"}
          </button>

          <button
            onClick={onToggleAutoCompile}
            className={`text-xs px-2.5 py-2 rounded-lg border transition ${
              autoCompileEnabled
                ? "bg-green-50 border-green-300 text-green-700"
                : "bg-white border-gray-300 text-gray-600"
            }`}
            title="Auto compile after debounce"
          >
            Auto {autoCompileEnabled ? "ON" : "OFF"}
          </button>
        </div>

        <button
          onClick={onDownload}
          disabled={downloadDisabled}
          className="flex items-center gap-1.5 bg-black text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          <Download size={14} /> Download
        </button>
      </div>

      {/* PREVIEW AREA */}
      <div className="flex-1 overflow-y-auto bg-gray-100 rounded-xl p-3 border border-gray-200">
        {compiling && (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            <Loader2 className="animate-spin mr-2" size={18} />
            Compiling your resume...
          </div>
        )}

        {!compiling && previewImageUrls.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm gap-2">
            <p>No preview yet</p>
            <p className="text-xs">Click Compile to generate</p>
          </div>
        )}

        <AnimatePresence>
          {!compiling &&
            previewImageUrls.map((url, idx) => (
              <motion.div
                key={url + idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mb-3 shadow-md rounded overflow-hidden bg-white"
              >
                <img
                  src={url}
                  alt={`Preview page ${idx + 1}`}
                  className="w-full block select-none pointer-events-none"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                {/* Client-side overlay watermark as extra safety */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center text-4xl font-black text-black select-none"
                  style={{
                    transform: "rotate(-30deg)",
                    letterSpacing: "0.3em",
                  }}
                >
                  PREVIEW ONLY
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WatermarkedPreview;