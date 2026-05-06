// ✅ Resume Summary
export const generateSummary = (data) => {
  return `Creative ${data.role || "developer"} with ${
    data.experience || "some"
  } years of experience. Skilled in ${
    data.skills?.map((s) => s.name || s).join(", ") || "React"
  }.`;
};

// ✅ Skills Suggestion
export const suggestSkills = (role) => {
  const map = {
    frontend: ["React", "JavaScript", "HTML", "CSS", "Tailwind"],
    backend: ["Node.js", "Express", "MongoDB", "API"],
    designer: ["Figma", "UI/UX", "Creativity"],
  };

  return map[role?.toLowerCase()] || ["Communication", "Teamwork"];
};

// ✅ Portfolio Bio
export const generatePortfolioBio = (name, skills) => {
  return `${name} is a passionate developer skilled in ${skills
    .map((s) => s.name || s)
    .join(", ")}.`;
};

// ✅ 🔥 IMPORTANT (THIS WAS MISSING)
export const generateExperienceDesc = (role) => {
  return `Worked as a ${role}, responsible for building scalable applications, improving performance, and collaborating with teams.`;
};

// ✅ Logo Names
// export const generateLogoNames = (business) => {
//   return [
//     `${business}Hub`,
//     `${business}ify`,
//     `${business}Works`,
//     `${business}Craft`,
//   ];
// };