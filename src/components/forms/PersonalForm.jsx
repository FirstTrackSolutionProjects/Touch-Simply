import { useResume } from "../../context/ResumeContext";

const PersonalForm = () => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

      <div className="grid gap-4">

        <input
          name="name"
          placeholder="Full Name"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={resumeData.personal.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email Address"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={resumeData.personal.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={resumeData.personal.phone}
          onChange={handleChange}
        />

      </div>
    </div>
  );
};

export default PersonalForm;