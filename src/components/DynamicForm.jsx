import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const hasOwn = (value, key) =>
  Object.prototype.hasOwnProperty.call(value, key);

const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const isFieldDefinition = (value) =>
  isObject(value) &&
  (hasOwn(value, "type") ||
    hasOwn(value, "current_value") ||
    hasOwn(value, "default_value"));

const titleCase = (value) =>
  String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());

const getFieldValue = (field) =>
  hasOwn(field, "current_value") ? field.current_value : field.default_value;

const getNodeTitle = (node, fallback) => {
  if (typeof node?.title === "string" && node.title.trim()) {
    return node.title;
  }
  if (typeof node?.label === "string" && node.label.trim()) {
    return node.label;
  }
  return fallback;
};

const getDateInputKind = (field) => {
  const descriptor = [field.name, field.title, field.label, field.placeholder]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  if (field.type === "date" || /\b(date of birth|birth date|dob)\b/.test(descriptor)) return "date";
  if (
    field.type === "month" ||
    /\b(start date|end date|completion date|pass date|month\s*\/?\s*year)\b/.test(descriptor)
  ) return "month";
  return null;
};

const toCalendarValue = (value, kind) => {
  if (!value) return "";
  const text = String(value).trim();
  const match = kind === "date"
    ? text.match(/^(\d{4}-\d{2}-\d{2})/)
    : text.match(/^(\d{4}-\d{2})/);
  if (match) return match[1];
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return "";
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return kind === "date" ? `${year}-${month}-${day}` : `${year}-${month}`;
};

const TRANSPARENT_CONTAINERS = new Set(["fields", "items", "subsections"]);
const METADATA_KEYS = new Set(["optional"]);
const HTML_INPUT_TYPES = new Set([
  "date",
  "email",
  "month",
  "number",
  "password",
  "search",
  "tel",
  "text",
  "time",
  "url",
  "week",
]);
const PHONE_COUNTRY_CODES = [
  ["+91", "India (+91)"], ["+1", "United States/Canada (+1)"], ["+44", "United Kingdom (+44)"],
  ["+61", "Australia (+61)"], ["+64", "New Zealand (+64)"], ["+971", "UAE (+971)"],
  ["+966", "Saudi Arabia (+966)"], ["+65", "Singapore (+65)"], ["+880", "Bangladesh (+880)"],
  ["+92", "Pakistan (+92)"], ["+94", "Sri Lanka (+94)"], ["+977", "Nepal (+977)"],
  ["+49", "Germany (+49)"], ["+33", "France (+33)"], ["+81", "Japan (+81)"],
  ["+86", "China (+86)"], ["+27", "South Africa (+27)"], ["+234", "Nigeria (+234)"],
];
const ROLE_OPTIONS = ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Web Developer", "Mobile App Developer", "Data Analyst", "Data Scientist", "DevOps Engineer", "UI/UX Designer", "Product Manager", "Project Manager", "Business Analyst", "Marketing Specialist", "Sales Executive", "Teacher", "Accountant", "Customer Support Representative", "Intern"];
const QUALIFICATION_OPTIONS = [
  "Secondary School Certificate (SSC)", "Higher Secondary Certificate (HSC)", "High School Diploma", "GED", "ITI Certificate", "Trade Certificate",
  "Diploma in Engineering", "Diploma in Civil Engineering", "Diploma in Computer Engineering", "Diploma in Electrical Engineering", "Diploma in Electronics Engineering", "Diploma in Mechanical Engineering", "Diploma in Nursing", "Diploma in Pharmacy", "Diploma in Education", "Advanced Diploma", "Associate Degree",
  "Bachelor of Arts (BA)", "Bachelor of Science (BSc)", "Bachelor of Commerce (BCom)", "Bachelor of Computer Applications (BCA)", "Bachelor of Technology (BTech)", "Bachelor of Engineering (BE)", "Bachelor of Business Administration (BBA)", "Bachelor of Business Management (BBM)", "Bachelor of Management Studies (BMS)", "Bachelor of Computer Science (BCS)", "Bachelor of Information Technology (BIT)", "Bachelor of Architecture (BArch)", "Bachelor of Design (BDes)", "Bachelor of Fine Arts (BFA)", "Bachelor of Education (BEd)", "Bachelor of Law (LLB)", "Bachelor of Laws (BA LLB)", "Bachelor of Medicine and Bachelor of Surgery (MBBS)", "Bachelor of Dental Surgery (BDS)", "Bachelor of Pharmacy (BPharm)", "Bachelor of Physiotherapy (BPT)", "Bachelor of Science in Nursing (BSc Nursing)", "Bachelor of Ayurvedic Medicine and Surgery (BAMS)", "Bachelor of Homeopathic Medicine and Surgery (BHMS)", "Bachelor of Veterinary Science (BVSc)", "Bachelor of Agriculture (BSc Agriculture)", "Bachelor of Hotel Management (BHM)", "Bachelor of Social Work (BSW)", "Bachelor of Statistics (BStat)", "Bachelor of Economics (BEcon)",
  "BTech in Computer Science and Engineering", "BTech in Information Technology", "BTech in Artificial Intelligence and Machine Learning", "BTech in Data Science", "BTech in Cybersecurity", "BTech in Software Engineering", "BTech in Electronics and Communication Engineering", "BTech in Electrical Engineering", "BTech in Electrical and Electronics Engineering", "BTech in Mechanical Engineering", "BTech in Civil Engineering", "BTech in Chemical Engineering", "BTech in Aerospace Engineering", "BTech in Biotechnology", "BTech in Biomedical Engineering", "BTech in Industrial Engineering", "BTech in Environmental Engineering", "BTech in Automobile Engineering", "BTech in Mechatronics", "BTech in Metallurgical Engineering", "BTech in Petroleum Engineering", "BTech in Mining Engineering", "BTech in Food Technology", "BTech in Agricultural Engineering",
  "Master of Arts (MA)", "Master of Science (MSc)", "Master of Commerce (MCom)", "Master of Computer Applications (MCA)", "Master of Technology (MTech)", "Master of Engineering (ME)", "Master of Business Administration (MBA)", "Master of Business Management (MBM)", "Master of Computer Science (MCS)", "Master of Information Technology (MIT)", "Master of Architecture (MArch)", "Master of Design (MDes)", "Master of Fine Arts (MFA)", "Master of Education (MEd)", "Master of Laws (LLM)", "Master of Public Health (MPH)", "Master of Social Work (MSW)", "Master of Pharmacy (MPharm)", "Master of Public Administration (MPA)", "Master of Statistics (MStat)", "Master of Economics (MEcon)", "Master of Public Policy (MPP)",
  "MTech in Computer Science and Engineering", "MTech in Information Technology", "MTech in Artificial Intelligence", "MTech in Data Science", "MTech in Cybersecurity", "MTech in Software Engineering", "MTech in Electronics and Communication Engineering", "MTech in Electrical Engineering", "MTech in Mechanical Engineering", "MTech in Civil Engineering", "MTech in Structural Engineering", "MTech in VLSI Design", "MTech in Biotechnology", "MTech in Chemical Engineering", "MTech in Environmental Engineering", "MTech in Robotics and Automation",
  "PhD", "Doctor of Philosophy (PhD)", "Doctor of Medicine (MD)", "Doctor of Dental Surgery (DDS)", "Doctor of Pharmacy (PharmD)", "Postgraduate Diploma", "Postgraduate Certificate", "Professional Certification", "Other"
];
const LOCATION_OPTIONS = ["India", "United States", "United Kingdom", "Canada", "Australia", "New Zealand", "United Arab Emirates", "Singapore", "Germany", "France", "Japan", "Other"];
const SKILL_GROUPS = {
  "Programming languages": ["JavaScript", "TypeScript", "Python", "Java", "C", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "Dart", "R", "Scala", "Bash", "PowerShell", "SQL", "HTML", "CSS"],
  "Web and application development": ["React", "Angular", "Vue.js", "Svelte", "Next.js", "Nuxt.js", "Node.js", "Express.js", "NestJS", "Django", "Flask", "FastAPI", "Spring Boot", "ASP.NET Core", "Laravel", "Ruby on Rails", "Flutter", "React Native", "Android Development", "iOS Development", "REST APIs", "GraphQL", "WebSockets", "Microservices", "Responsive Design", "Accessibility (WCAG)"],
  "Databases and data": ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Microsoft SQL Server", "Oracle Database", "Redis", "Elasticsearch", "Firebase", "DynamoDB", "Database Design", "Data Modeling", "ETL", "Data Analysis", "Data Visualization", "Pandas", "NumPy", "Apache Spark", "Power BI", "Tableau", "Excel", "Machine Learning", "Deep Learning", "Natural Language Processing", "Generative AI", "Statistics"],
  "Cloud, DevOps and security": ["AWS", "Microsoft Azure", "Google Cloud Platform", "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "GitHub Actions", "CI/CD", "Linux", "Git", "GitHub", "GitLab", "Nginx", "Serverless", "Prometheus", "Grafana", "Cybersecurity", "Network Security", "OWASP", "Penetration Testing", "Identity and Access Management"],
  "Design and product": ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe XD", "Sketch", "UI Design", "UX Research", "Prototyping", "Design Systems", "Wireframing", "Interaction Design", "Usability Testing", "Product Strategy", "Roadmapping", "Agile", "Scrum", "Kanban", "Jira", "Confluence", "Project Management", "Business Analysis", "Requirements Gathering"],
  "Business, marketing and operations": ["Digital Marketing", "SEO", "Content Marketing", "Social Media Marketing", "Google Analytics", "Google Ads", "Email Marketing", "Copywriting", "Market Research", "Sales", "Lead Generation", "CRM", "Customer Success", "Customer Support", "Accounting", "Financial Analysis", "Bookkeeping", "Human Resources", "Recruitment", "Supply Chain Management", "Operations Management", "Negotiation"],
  "Communication and professional": ["Written Communication", "Verbal Communication", "Presentation Skills", "Teamwork", "Leadership", "Problem Solving", "Critical Thinking", "Time Management", "Adaptability", "Attention to Detail", "Mentoring", "Conflict Resolution", "Decision Making", "Creativity", "Research", "Teaching", "Training", "Documentation"]
};

const SkillsPicker = ({ value, onChange, path, fieldClassName, label, required }) => {
  const [selected, setSelected] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const [search, setSearch] = useState("");
  const skills = Array.isArray(value) ? value.map((skill) => String(skill)) : String(value || "").split(/\r?\n|,/).map((skill) => skill.trim()).filter(Boolean);
  const commit = (candidate) => {
    const skill = candidate.trim();
    if (!skill || skills.some((item) => item.toLowerCase() === skill.toLowerCase())) return;
    onChange(path, [...skills, skill]);
    setSelected("");
    setCustomSkill("");
  };
  const remove = (skill) => onChange(path, skills.filter((item) => item !== skill));
  return (
    <div className="md:col-span-2">
      <label className="block text-xs font-medium text-gray-700 mb-1">{label} {required && "*"}</label>
      <input type="search" value={search} placeholder="Search skills" className={`${fieldClassName} mb-2`} onChange={(event) => { setSearch(event.target.value); setSelected(""); }} />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[2fr_auto]">
        <select aria-label="Choose a skill" value={selected} className={fieldClassName} onChange={(event) => setSelected(event.target.value)}>
          <option value="">Choose a skill to add</option>
          {Object.entries(SKILL_GROUPS).map(([group, options]) => {
            const matches = options.filter((skill) => skill.toLowerCase().includes(search.trim().toLowerCase()));
            return matches.length ? <optgroup key={group} label={group}>{matches.map((skill) => <option key={skill} value={skill}>{skill}</option>)}</optgroup> : null;
          })}
        </select>
        <button type="button" disabled={!selected} onClick={() => commit(selected)} className="rounded-lg bg-purple-100 px-4 py-2.5 text-sm font-medium text-purple-700 disabled:opacity-50">Add skill</button>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-[2fr_auto]">
        <input type="text" value={customSkill} placeholder="Or type any skill" className={fieldClassName} onChange={(event) => setCustomSkill(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); commit(customSkill); } }} />
        <button type="button" disabled={!customSkill.trim()} onClick={() => commit(customSkill)} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 disabled:opacity-50">Add custom</button>
      </div>
      {skills.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{skills.map((skill, index) => <span key={`${skill}-${index}`} className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-xs text-purple-800">{skill}<button type="button" aria-label={`Remove ${skill}`} onClick={() => remove(skill)} className="font-bold text-purple-600">×</button></span>)}</div>}
    </div>
  );
};

const DynamicForm = ({
  config,
  onChange,
  onAddArrayField,
  onRemoveArrayField,
}) => {
  const sectionHelp = {
    header: "Add your name and the contact details you want employers to use.",
    personal_information: "Add the personal and contact details you want employers to see. You can leave private or optional details blank.",
    personal_details: "Optional: add any details you want, such as date of birth, gender, parents' names, nationality, marital status, birthplace, address, or languages. Leave any field blank and it will be omitted from your CV.",
    education: "For every course or qualification, add the school, college, or university name, your degree/course, start date, completion or pass date, and grade if available.",
    experience: "Add each job or internship, with the organization, your role, dates, and key responsibilities.",
    skills: "Add skills relevant to the role you are applying for.",
    projects: "Add projects with a short description of what you built or achieved.",
  };
  const humanizeSection = (id, title) => {
    if (id.toLowerCase() === "header") return "Personal Information";
    if (id.toLowerCase() === "personal_information") return "Personal Information";
    return title;
  };
  const renderField = (field, path) => {
    const fieldId = path.map(String).join("-");
    const label = field.title || field.label || field.name;
    const value = getFieldValue(field);
    const required = field.required === true;
    const isEmpty = value == null || value === "" || (Array.isArray(value) && value.length === 0);
    const placeholder = isEmpty
      ? field.placeholder || label || "Enter value"
      : "";
    const fieldDescriptor = [field.name, field.title, field.label, field.placeholder]
      .filter(Boolean).join(" ").toLowerCase();
    const fieldClassName =
      "w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-sm placeholder:text-gray-500";

    if (field.type === "checkbox") {
      return (
        <div key={fieldId}>
          <label
            htmlFor={fieldId}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
              id={fieldId}
              type="checkbox"
              checked={Boolean(value)}
              required={required}
              onChange={(event) => onChange(path, event.target.checked)}
            />
            <span>
              {label} {required && "*"}
            </span>
          </label>
        </div>
      );
    }

    if (/\bskills?\b/.test(fieldDescriptor) && (field.type === "list" || Array.isArray(value))) {
      return <SkillsPicker key={fieldId} value={value} onChange={onChange} path={path} fieldClassName={fieldClassName} label={label} required={required} />;
    }

    if (field.type === "select") {
      return (
        <div key={fieldId}>
          <label
            htmlFor={fieldId}
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            {label} {required && "*"}
          </label>
          <select
            id={fieldId}
            value={value ?? ""}
            required={required}
            className={fieldClassName}
            onChange={(event) => onChange(path, event.target.value)}
          >
            <option value="">Select...</option>
            {(field.options || []).map((option) => {
              const optionValue =
                isObject(option) && hasOwn(option, "value")
                  ? option.value
                  : option;
              const optionLabel =
                isObject(option) && hasOwn(option, "label")
                  ? option.label
                  : optionValue;
              return (
                <option key={String(optionValue)} value={optionValue}>
                  {optionLabel}
                </option>
              );
            })}
          </select>
        </div>
      );
    }

    if (/\b(phone|mobile|telephone)\b/.test(fieldDescriptor)) {
      const phoneMatch = String(value ?? "").trim().match(/^(\+\d{1,4})\s*(.*)$/);
      const currentCode = phoneMatch?.[1] || "+91";
      const phoneNumber = phoneMatch ? phoneMatch[2] : String(value ?? "");
      return (
        <div key={fieldId}>
          <label htmlFor={fieldId} className="block text-xs font-medium text-gray-700 mb-1">{label} {required && "*"}</label>
          <div className="grid grid-cols-[minmax(125px,0.8fr)_2fr] gap-2">
            <select aria-label="Phone country calling code" value={currentCode} required={required} className={fieldClassName}
              onChange={(event) => onChange(path, `${event.target.value} ${phoneNumber}`.trim())}>
              {PHONE_COUNTRY_CODES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
            </select>
            <input id={fieldId} type="tel" value={phoneNumber} required={required} placeholder="Phone number" className={fieldClassName}
              onChange={(event) => onChange(path, `${currentCode} ${event.target.value}`.trim())} />
          </div>
        </div>
      );
    }

    if (/\b(role|job title|position)\b/.test(fieldDescriptor)) {
      const isKnownRole = ROLE_OPTIONS.includes(String(value ?? ""));
      return (
        <div key={fieldId}>
          <label htmlFor={fieldId} className="block text-xs font-medium text-gray-700 mb-1">{label} {required && "*"}</label>
          <select id={fieldId} value={isKnownRole ? value : value ? "__custom__" : ""} required={required} className={fieldClassName}
            onChange={(event) => onChange(path, event.target.value === "__custom__" ? "" : event.target.value)}>
            <option value="">Choose a role or type one</option>
            {ROLE_OPTIONS.map((role) => <option key={role} value={role}>{role}</option>)}
            <option value="__custom__">Other — type your own</option>
          </select>
          {(!isKnownRole && value !== "") || value === "" ? (
            <input aria-label={`${label} custom value`} type="text" value={isKnownRole ? "" : (value ?? "")} placeholder="Type your role" className={`${fieldClassName} mt-2`}
              onChange={(event) => onChange(path, event.target.value)} />
          ) : null}
        </div>
      );
    }

    if (/\b(qualification|course|degree)\b/.test(fieldDescriptor)) {
      return (
        <div key={fieldId}>
          <label htmlFor={fieldId} className="block text-xs font-medium text-gray-700 mb-1">{label} {required && "*"}</label>
          <input id={fieldId} type="search" list={`${fieldId}-qualifications`} value={value ?? ""} required={required} placeholder="Search or type a qualification" className={fieldClassName}
            onChange={(event) => onChange(path, event.target.value)} />
          <datalist id={`${fieldId}-qualifications`}>{QUALIFICATION_OPTIONS.map((qualification) => <option key={qualification} value={qualification} />)}</datalist>
          <p className="mt-1 text-xs text-gray-500">Search the list or enter any degree/course name.</p>
        </div>
      );
    }

    if (/\blocation\b/.test(fieldDescriptor) && !/work location/i.test(fieldDescriptor)) {
      const rawLocation = String(value ?? "");
      const countryMatch = rawLocation.match(/(?:^| · )Country: ([^·]*)/);
      const postalMatch = rawLocation.match(/(?:^| · )PIN: ([^·]*)/);
      const addressMatch = rawLocation.match(/(?:^| · )Address: ([^·]*)/);
      const locality = rawLocation.split(" · ")[0].replace(/^Country:.*$|^PIN:.*$|^Address:.*$/i, "");
      const countryValue = countryMatch?.[1]?.trim() || "";
      const postalCode = postalMatch?.[1]?.trim() || "";
      const address = addressMatch?.[1]?.trim() || "";
      const updateLocation = (nextLocality, nextCountry, nextPostalCode, nextAddress) => {
        const pieces = [
          String(nextLocality || "").trim(),
          nextCountry ? `Country: ${String(nextCountry).trim()}` : "",
          nextPostalCode ? `PIN: ${String(nextPostalCode).trim()}` : "",
          nextAddress ? `Address: ${String(nextAddress).trim()}` : "",
        ].filter(Boolean);
        onChange(path, pieces.join(" · "));
      };
      return (
        <div key={fieldId} className="md:col-span-2">
          <label htmlFor={fieldId} className="block text-xs font-medium text-gray-700 mb-1">{label} {required && "*"}</label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input id={fieldId} list={`${fieldId}-suggestions`} value={locality} required={required} placeholder="City, State / Province" className={fieldClassName}
              onChange={(event) => updateLocation(event.target.value, countryValue, postalCode, address)} />
            <datalist id={`${fieldId}-suggestions`}><option value="New Delhi, Delhi" /><option value="Mumbai, Maharashtra" /><option value="Bengaluru, Karnataka" /><option value="Kolkata, West Bengal" /><option value="Chennai, Tamil Nadu" /><option value="Hyderabad, Telangana" /></datalist>
            <input aria-label="Country or region" list={`${fieldId}-countries`} value={countryValue} placeholder="Choose or type country / region" className={fieldClassName}
              onChange={(event) => updateLocation(locality, event.target.value, postalCode, address)} />
            <datalist id={`${fieldId}-countries`}>{LOCATION_OPTIONS.filter((place) => place !== "Other").map((place) => <option key={place} value={place} />)}</datalist>
            <input aria-label="PIN / postal code" type="text" inputMode="numeric" autoComplete="postal-code" value={postalCode} placeholder="PIN / Postal code (optional)" className={fieldClassName}
              onChange={(event) => updateLocation(locality, countryValue, event.target.value, address)} />
            <textarea aria-label="Full address" autoComplete="street-address" value={address} placeholder="Full address (optional)" rows={2} className={`${fieldClassName} sm:col-span-2`}
              onChange={(event) => updateLocation(locality, countryValue, postalCode, event.target.value)} />
          </div>
        </div>
      );
    }

    if (field.type === "textarea" || field.type === "list") {
      const textValue =
        field.type === "list" && Array.isArray(value)
          ? value.join("\n")
          : value ?? "";
      return (
        <div
          key={fieldId}
          className={
            field.type === "textarea" || field.type === "list"
              ? "md:col-span-2"
              : ""
          }
        >
          <label
            htmlFor={fieldId}
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            {label} {required && "*"}
          </label>
          <textarea
            id={fieldId}
            value={textValue}
            required={required}
            placeholder={placeholder}
            rows={field.rows || 3}
            className={fieldClassName}
            onChange={(event) => {
              const nextValue =
                field.type === "list"
                  ? event.target.value
                      .split(/\r?\n/)
                      .filter((line) => line.trim().length > 0)
                  : event.target.value;
              onChange(path, nextValue);
            }}
          />
        </div>
      );
    }

    if (/\bsummary\b/.test(fieldDescriptor)) {
      return (
        <div key={fieldId} className="md:col-span-2">
          <label htmlFor={fieldId} className="block text-xs font-medium text-gray-700 mb-1">
            {label} {required && "*"}
          </label>
          <textarea
            id={fieldId}
            value={value ?? ""}
            required={required}
            placeholder={placeholder || "Write a concise professional summary"}
            rows={5}
            maxLength={2000}
            className={`${fieldClassName} min-h-32 resize-y leading-6`}
            onChange={(event) => onChange(path, event.target.value)}
          />
          <p className="mt-1 text-xs text-gray-500">Write a few sentences about your experience, strengths, and career goals.</p>
        </div>
      );
    }

    const dateInputKind = getDateInputKind(field);
    const isDateRange = /\bdate\s*range\b/i.test(
      [field.name, field.title, field.label, field.placeholder].filter(Boolean).join(" ")
    );
    if (isDateRange) {
      const [rawStart = "", rawEnd = ""] = String(value ?? "").split(/\s*(?:--|–|—|\bto\b)\s*/i);
      const start = toCalendarValue(rawStart, "month");
      const end = toCalendarValue(rawEnd, "month");
      const updateRange = (nextStart, nextEnd) => {
        const range = nextStart || nextEnd ? `${nextStart} -- ${nextEnd}` : "";
        onChange(path, range);
      };
      return (
        <div key={fieldId} className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {label} {required && "*"}
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block text-xs text-gray-500">
              Start month
              <input
                type="month"
                aria-label={`${label} start month`}
                value={start}
                required={required}
                className={`${fieldClassName} mt-1`}
                onChange={(event) => updateRange(event.target.value, end)}
              />
            </label>
            <label className="block text-xs text-gray-500">
              End month
              <input
                type="month"
                aria-label={`${label} end month`}
                value={end}
                required={required}
                className={`${fieldClassName} mt-1`}
                onChange={(event) => updateRange(start, event.target.value)}
              />
            </label>
          </div>
        </div>
      );
    }

    const inputType = dateInputKind || (HTML_INPUT_TYPES.has(field.type) ? field.type : "text");
    const inputValue = dateInputKind ? toCalendarValue(value, dateInputKind) : (value ?? "");
    return (
      <div key={fieldId}>
        <label
          htmlFor={fieldId}
          className="block text-xs font-medium text-gray-700 mb-1"
        >
          {label} {required && "*"}
        </label>
        <input
          id={fieldId}
          type={inputType}
          value={inputValue}
          required={required}
          placeholder={placeholder}
          className={fieldClassName}
          onChange={(event) => onChange(path, event.target.value)}
        />
        {dateInputKind && (
          <p className="mt-1 text-xs text-gray-500">Select {dateInputKind === "date" ? "a date" : "a month and year"} from the calendar.</p>
        )}
      </div>
    );
  };

  const renderArray = (items, path) => {
    const itemLabel = titleCase(path[path.length - 1] || "item");
    const singularItemLabel = itemLabel.endsWith("s")
      ? itemLabel.slice(0, -1)
      : itemLabel;

    return (
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">
            No entries are defined for this group.
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {items.map((item, index) => (
              <motion.div
                key={`${path.map(String).join("-")}-${index}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-4 border rounded-xl bg-gray-50 relative space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-600">
                    Entry {index + 1}
                  </span>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveArrayField(path, index)}
                      className="flex items-center gap-1 text-xs text-red-500 hover:bg-red-50 rounded p-1"
                      aria-label={`Remove ${singularItemLabel.toLowerCase()} ${index + 1}`}
                    >
                      <X size={14} /> Remove
                    </button>
                  )}
                </div>
                {renderNode(item, [...path, index])}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        {items.length > 0 && (
          <button
            type="button"
            onClick={() => onAddArrayField(path)}
            className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-md hover:bg-purple-200 transition"
          >
            <Plus size={14} /> Add {singularItemLabel.toLowerCase()}
          </button>
        )}
      </div>
    );
  };

  const renderNode = (node, path) => {
    if (isFieldDefinition(node)) {
      return renderField(node, path);
    }
    if (Array.isArray(node)) {
      return renderArray(node, path);
    }
    if (!isObject(node)) {
      return null;
    }

    const entries = Object.entries(node).filter(
      ([key, value]) =>
        !METADATA_KEYS.has(key) &&
        !(["label", "title"].includes(key) && typeof value === "string")
    );
    const fields = entries.filter(([, value]) => isFieldDefinition(value));
    const children = entries.filter(([, value]) => !isFieldDefinition(value));

    return (
      <div className="space-y-4">
        {fields.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(([key, field]) =>
              renderField(field, [...path, key])
            )}
          </div>
        )}
        {children.map(([key, child]) => {
          const childPath = [...path, key];
          if (TRANSPARENT_CONTAINERS.has(key)) {
            return (
              <React.Fragment key={key}>
                {renderNode(child, childPath)}
              </React.Fragment>
            );
          }

          return (
            <div key={key} className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">
                {getNodeTitle(child, titleCase(key))}
              </h4>
              {renderNode(child, childPath)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {Object.entries(config.sections).map(([sectionId, section]) => {
        const title = humanizeSection(sectionId, getNodeTitle(section, titleCase(sectionId)));
        return (
          <section
            key={sectionId}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-800">{title}</h3>
              {section.optional && (
                <span className="text-[11px] text-gray-400">Optional</span>
              )}
            </div>
            {sectionHelp[sectionId.toLowerCase()] && (
              <p className="-mt-2 mb-4 text-xs leading-5 text-gray-500">
                {sectionHelp[sectionId.toLowerCase()]}
              </p>
            )}
            {renderNode(section, ["sections", sectionId])}
          </section>
        );
      })}
    </div>
  );
};

export default DynamicForm;
