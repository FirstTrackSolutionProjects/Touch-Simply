import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const SignatureForm = ({ goBack }) => {
  const { resumeData, setResumeData } = useResume();

  const [signature, setSignature] = useState(
    resumeData.agreement?.signature || ""
  );

  const [agreed, setAgreed] = useState(
    resumeData.agreement?.agreed || false
  );

  const [saved, setSaved] = useState(false);

  // ✅ Save data
  const handleSave = () => {
    if (!signature || !agreed) return;

    setResumeData({
      ...resumeData,
      agreement: {
        signature,
        agreed,
      },
    });

    setSaved(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-4">

      <div className="space-y-6 bg-white p-5 md:p-6 rounded-xl shadow">

        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-bold">
          Declaration & Agreement
        </h2>

        {/* Signature */}
        <div className="space-y-2">
          <label className="font-medium text-sm md:text-base">
            Signature (Type your full name)
          </label>

          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="Enter your full name"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4"
          />

          <p className="text-sm text-gray-600">
            I hereby declare that the information provided above is true
            and correct to the best of my knowledge. I agree to the
            terms and conditions.
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {saved && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">
            ✅ Agreement saved successfully!
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* Back */}
          <button
            onClick={goBack}
            className="flex-1 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
          >
            ← Back
          </button>

          {/* Save & Finish */}
          <button
            onClick={handleSave}
            disabled={!signature || !agreed}
            className={`flex-1 py-2 rounded-lg text-white transition ${
              signature && agreed
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            ✔ Save & Finish
          </button>

        </div>

      </div>
    </div>
  );
};

export default SignatureForm;