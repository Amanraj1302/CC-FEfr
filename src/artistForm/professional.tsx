import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { professionalSchema } from "../Schemas/artistSchema";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

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
  "Horse Riding", "Swimming", "Scating", "Driving",
  "Dance", "Music", "Singing", "Martial Arts"
];

const professionalFields = [
  { id: "talentCategory", label: "Talent Category", placeholder: "Enter category" },
  { id: "height", label: "Height", placeholder: "Enter your height" },
  { id: "age", label: "Age", placeholder: "Enter your age" },
  { id: "screenAge", label: "Screen Age", placeholder: "Enter your screen age" },
  { id: "videoReel", label: "Video Reel (YouTube only)", placeholder: "youtube.com/yourvideoreel" },
] as const;


export const Professional: React.FC= () => {
   const navigate = useNavigate();
   const step = useParams<{ step: string }>().step || "";
  return (
    <Formik<ProfessionalFormValues>
      initialValues={{
        talentCategory: "",
        height: "",
        age: "",
        screenAge: "",
        videoReel: "",
        skills: [],
        pastProjects: [
          { projectName: "", role: "", workLink: "" },
          { projectName: "", role: "", workLink: "" },
          { projectName: "", role: "", workLink: "" }
        ]
      }}
      validationSchema={professionalSchema}
      onSubmit={(values) => {
        console.log("Professional Data", values);
        toast.success("Professional info saved!");
        //onNext();
      }}
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form className="max-w-5xl mx-auto px-6 py-10 bg-white rounded-xl shadow space-y-6">

          {/* Basic Fields */}
          <div className="grid md:grid-cols-3 gap-6">
            {professionalFields.map(({ id, label, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block font-medium mb-1">{label}</label>
                <input
                  id={id}
                  name={id}
                  type="text"
                  value={values[id]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                {touched[id] && errors[id] && (
                  <p className="text-red-500 text-sm mt-1">{errors[id] as string}</p>
                )}
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div>
            <label className="block font-medium mb-2">Skills</label>
            <div className="flex flex-wrap gap-4">
              {skillOptions.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center gap-2 border px-3 py-1 rounded cursor-pointer"
                >
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

          {/* Past Projects Section */}
          <FieldArray name="pastProjects">
            {({ push }) => (
              <div>
                <h3 className="text-lg font-semibold mb-4">Past Projects</h3>
                {values.pastProjects.map((project, index) => (
                  <div key={index} className="grid md:grid-cols-3 gap-4 mb-4">
                    {["projectName", "role", "workLink"].map((field) => {
                      const fieldName = `pastProjects[${index}].${field}`;
                      const placeholders: Record<string, string> = {
                        projectName: "Enter project name",
                        role: "Enter your role",
                        workLink: "youtube.com/project-video"
                      };
                      const labels: Record<string, string> = {
                        projectName: "Project Name",
                        role: "Role",
                        workLink: "Work Link"
                      };

                      return (
                        <div key={field}>
                          <label htmlFor={fieldName} className="block font-medium mb-1">
                            {labels[field]}
                          </label>
                          <input
                            name={fieldName}
                            value={project[field as keyof typeof project]}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder={placeholders[field]}
                          />
                          {Array.isArray(errors.pastProjects) &&
                            (errors.pastProjects[index] as { [key: string]: string } | undefined)?.[field] && (
                              <p className="text-red-500 text-sm mt-1">
                                {(errors.pastProjects[index] as { [key: string]: string })[field]}
                              </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ projectName: "", role: "", workLink: "" })}
                  className="text-red-500 mt-2"
                >
                  + Add more projects
                </button>
              </div>
            )}
          </FieldArray>

          {/* Footer Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={()=>{ navigate(`/app/dashboard/${+step - 1}`) }}
              className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
            >
              Back
            </button>
            <div>
              <button type="button" className="text-red-600 font-medium mr-4">Save Draft</button>
              <button onClick={ ()=> { navigate(`/app/dashboard/${+step+ 1}`) } }
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                Next
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
