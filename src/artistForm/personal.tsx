import React from "react";
import { useFormik } from "formik";
 import { personalSchema } from "../Schemas/artistSchema";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";




type ArtistFormValues = {
  fullName: string; email: string; whatsapp: string; calling: string;
  shortBio: string; gender: string; language: string; homeCity: string;
  homeState: string; currentCity: string; currentState: string;
  instagram: string; youtube: string; twitter: string; linkedin: string;
};

type Field = {
  id: keyof ArtistFormValues;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
};

const fields: Field[] = [
  { id: "fullName", label: "Full Name", placeholder: "Enter your full name", type: "text" },
  { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
  { id: "email", label: "Email", placeholder: "your@email.com", type: "email" },
  { id: "language", label: "Language", placeholder: "Enter the language you speak", type: "text" },
  { id: "whatsapp", label: "Whatsapp", placeholder: "+91 1234567890", type: "text" },
  { id: "calling", label: "Calling", placeholder: "+91 1234567890", type: "text" },
  { id: "shortBio", label: "Short Bio", placeholder: "Tell us about yourself...", type: "textarea" },
  { id: "homeCity", label: "Home City", placeholder: "Enter your home city", type: "text" },
  { id: "homeState", label: "Home State", type: "select", options: ["State1", "State2"] },
  { id: "currentCity", label: "Current City", placeholder: "Enter your current city", type: "text" },
  { id: "currentState", label: "Current State", type: "select", options: ["State1", "State2"] },
  { id: "instagram", label: "Instagram", placeholder: "instagram.com/yourprofile", type: "text" },
  { id: "twitter", label: "Twitter", placeholder: "@yourhandle", type: "text" },
  { id: "youtube", label: "YouTube", placeholder: "youtube.com/yourprofile", type: "text" },
  { id: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/yourprofile", type: "text" },
];



export const Personal: React.FC =() => {
 
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik<ArtistFormValues>({
    initialValues: {
      fullName: "", email: "", whatsapp: "", calling: "", shortBio: "", gender: "", language: "", homeCity: "",
      homeState: "", currentCity: "", currentState: "", instagram: "", youtube: "", twitter: "", linkedin: "", 
    },
    validationSchema: personalSchema,
    onSubmit: (values) => {
  
}

  });
  const navigate = useNavigate();
  const step = useParams<{ step: string }>().step || "";

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-white rounded-xl shadow">

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ id, label, type, placeholder, options }) => (
          <div key={id} className={id === "shortBio" ? "md:col-span-2" : ""}>
            <label htmlFor={id} className="block font-medium mb-1">{label}</label>

            {type === "textarea" ? (
              <textarea
                id={id}
                name={id}
                value={values[id as keyof ArtistFormValues]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className="w-full border border-gray-300 p-2 rounded h-28"
              />
            ) : type === "select" && options ? (
              <select
                id={id}
                name={id}
                value={values[id as keyof ArtistFormValues]}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Choose</option>
                {options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={id}
                type="text"
                value={values[id as keyof ArtistFormValues]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className="w-full border border-gray-300 p-2 rounded"
              />
            )}

            {errors[id as keyof ArtistFormValues] && touched[id as keyof ArtistFormValues] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[id as keyof ArtistFormValues]}
              </p>
            )}
          </div>
        ))}

        <div className="md:col-span-2 flex justify-between mt-6">
          <button type="button" className="text-red-600 font-medium">Save Draft</button>
          <button type='button' onClick={() => navigate(`/app/dashboard/${+step + 1}`)} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
