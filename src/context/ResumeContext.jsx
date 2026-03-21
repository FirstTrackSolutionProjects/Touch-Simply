import { createContext, useContext, useState } from "react";

// Create Context
const ResumeContext = createContext();

// Provider Component
export const ResumeProvider = ({ children }) => {
  const [template, setTemplate] = useState("modern");

  const [resumeData, setResumeData] = useState({
    personal: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    languages: [],
  });

  return (
    <ResumeContext.Provider
      value={{
        template,
        setTemplate,
        resumeData,
        setResumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};


export const useResume = () => {
  return useContext(ResumeContext);
};