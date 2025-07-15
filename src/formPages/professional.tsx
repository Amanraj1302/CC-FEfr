import React, { useEffect, useState } from "react";
import { Formik, FieldArray, ErrorMessage } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { professionalSchema } from "../Schemas/artistSchema";
import { useAuth } from "../context/AuthContext";
import { saveFormData, getFormData } from "../utils/localStorageHelper";

type ProfessionalFormValues = {
  talentCategory: string;
  height: string;
  age: string;
  screenAge: string;
  videoReel: string;
  skills: string[];
  pastProjects: {
    projectName: string;
    role: string;
    workLink: string;
  }[];
};

const skillOptions = [
  "Horse Riding",
  "Swimming",
  "Scating",
  "Driving",
  "Dance",
  "Music",
  "Singing",
  "Martial Arts",
];

const fields = [
  { id: "talentCategory", label: "Talent Category", placeholder: "Enter category", type: "text" },
  { id: "height", label: "Height", placeholder: "Enter your height", type: "text" },
  { id: "age", label: "Age", placeholder: "Enter your age", type: "number" },
  { id: "screenAge", label: "Screen Age", placeholder: "Enter your screen age", type: "number" },
  { id: "videoReel", label: "Video Reel (YouTube only)", placeholder: "youtube.com/yourvideoreel", type: "text" },
] as const;

export const Professional: React.FC = () => {
  const navigate = useNavigate();
  const step = useParams<{ step: string }>().step || "";
  const { userEmail } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

  const defaultValues: ProfessionalFormValues = {
    talentCategory: "",
    height: "",
    age: "",
    screenAge: "",
    videoReel: "",
    skills: [],
    pastProjects: [{ projectName: "", role: "", workLink: "" }],
  };

  const [initialValues, setInitialValues] = useState<ProfessionalFormValues>(defaultValues);

  useEffect(() => {
    const fetchProfessional = async () => {
      if (mode === "edit") {
        try {
          const res = await fetch(`http://localhost:5000/api/artist/professional?email=${userEmail}`, {
            credentials: "include",
          });

          const data = await res.json();
          if (res.ok) {
            setInitialValues(data);
          } else {
            toast.error(data.message || "Failed to load data");
          }
        } catch (error) {
          toast.error("Error fetching professional info");
        }
      } else {
        const saved = getFormData("page2");
        if (saved) {
          setInitialValues({ ...defaultValues, ...saved });
        }
      }
    };

    fetchProfessional();
  }, [mode, userEmail]);

  const handleSubmit = async (values: ProfessionalFormValues) => {
    try {
      const res = await fetch("http://localhost:5000/api/artist/professional", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...values, email: userEmail }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(mode === "edit" ? "Profile updated!" : "Professional info submitted!");
        navigate(
          mode === "edit"
            ? `/app/dashboard/${+step + 1}?mode=edit`
            : `/app/dashboard/${+step + 1}`
        );
      } else {
        toast.error(data.message || "Submission failed");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Something went wrong");
    }
  };

  const handleSaveDraft = (values: ProfessionalFormValues) => {
    saveFormData("page2", values);
    toast.success("Draft saved!");
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={professionalSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto px-6 py-10 bg-white rounded-xl shadow space-y-6 mb-7"
        >
          {/* Input Fields */}
          <div className="grid md:grid-cols-3 gap-6">
            {fields.map(({ id, label, placeholder, type }) => (
              <div key={id}>
                <label htmlFor={id} className="block font-medium mb-1">{label}</label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  value={values[id as keyof ProfessionalFormValues] as string}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                {touched[id as keyof typeof touched] && errors[id as keyof typeof errors] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[id as keyof typeof errors] as string}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <label className="block font-medium mb-2">Skills</label>
            <div className="flex flex-wrap gap-4">
              {skillOptions.map((skill) => (
                <label key={skill} className="flex items-center gap-2 border px-3 py-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    name="skills"
                    value={skill}
                    checked={values.skills.includes(skill)}
                    onChange={handleChange}
                  />
                  {skill}
                </label>
              ))}
            </div>
            {touched.skills && errors.skills && (
              <p className="text-red-500 text-sm mt-1">{errors.skills as string}</p>
            )}
          </div>

          {/* Past Projects */}
          <FieldArray name="pastProjects">
            {({ push, remove }) => (
              <div>
                <h3 className="text-lg font-semibold mb-4">Past Projects</h3>
                {values.pastProjects.map((proj, i) => (
                  <div
                    key={i}
                    className="grid md:grid-cols-3 gap-4 mb-6 border p-4 rounded-md relative"
                  >
                    {["projectName", "role", "workLink"].map((field) => (
                      <div key={field}>
                        <label className="block font-medium mb-1">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          name={`pastProjects[${i}].${field}`}
                          value={proj[field as keyof typeof proj]}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-2 rounded"
                          placeholder={`Enter ${field}`}
                        />
                        <ErrorMessage
                          name={`pastProjects[${i}].${field}`}
                          component="p"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>
                    ))}

                    {values.pastProjects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        className="absolute top-2 right-2 text-sm text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => push({ projectName: "", role: "", workLink: "" })}
                  className="text-red-500 mt-2"
                >
                  + Add More Projects
                </button>
              </div>
            )}
          </FieldArray>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() =>
                navigate(
                  mode === "edit"
                    ? `/app/dashboard/${+step - 1}?mode=edit`
                    : `/app/dashboard/${+step -1}`
                )
              }
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Back
            </button>
            <div>
              <button
                type="button"
                onClick={() => handleSaveDraft(values)}
                className="text-red-600 font-medium mr-4 underline"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
