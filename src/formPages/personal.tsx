import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { personalSchema } from "../Schemas/artistSchema";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { indianStates, languages } from "../constants/indianStates";
import { saveFormData, getFormData } from "../utils/localStorageHelper";
import { useAuth } from "../context/AuthContext";

type ArtistFormValues = {
  fullName: string;
  email: string;
  whatsapp: string;
  calling: string;
  shortBio: string;
  gender: string;
  language: string;
  homeCity: string;
  homeState: string;
  currentCity: string;
  currentState: string;
  instagram: string;
  youtube: string;
  twitter: string;
  linkedin: string;
};

const fields = [
  { id: "fullName", label: "Full Name", placeholder: "Enter your full name", type: "text" },
  { id: "gender", label: "Gender", type: "select", options: ["male", "female", "other"] },
  { id: "email", label: "Email", placeholder: "your@email.com", type: "email" },
  { id: "language", label: "Language", type: "select", options: languages },
  { id: "whatsapp", label: "Whatsapp", placeholder: "+91 1234567890", type: "text" },
  { id: "calling", label: "Calling", placeholder: "+91 1234567890", type: "text" },
  { id: "shortBio", label: "Short Bio", placeholder: "Tell us about yourself...", type: "textarea" },
  { id: "homeCity", label: "Home City", placeholder: "Enter your home city", type: "text" },
  { id: "homeState", label: "Home State", type: "select", options: indianStates },
  { id: "currentCity", label: "Current City", placeholder: "Enter your current city", type: "text" },
  { id: "currentState", label: "Current State", type: "select", options: indianStates },
  { id: "instagram", label: "Instagram", placeholder: "instagram.com/yourprofile", type: "text" },
  { id: "twitter", label: "Twitter", placeholder: "@yourhandle", type: "text" },
  { id: "youtube", label: "YouTube", placeholder: "youtube.com/yourprofile", type: "text" },
  { id: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/yourprofile", type: "text" },
];

export const Personal: React.FC = () => {
  const { userEmail } = useAuth();
  const email = userEmail || "";
  const navigate = useNavigate();
  const step = useParams<{ step: string }>().step || "";
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

  const defaultValues: ArtistFormValues = {
    fullName: "",
    email: "",
    whatsapp: "",
    calling: "",
    shortBio: "",
    gender: "",
    language: "",
    homeCity: "",
    homeState: "",
    currentCity: "",
    currentState: "",
    instagram: "",
    youtube: "",
    twitter: "",
    linkedin: "",
  };

  const [initialValues, setInitialValues] = useState<ArtistFormValues>(defaultValues);

  useEffect(() => {
    const fetchProfile = async () => {
      if (mode === "edit") {
        try {
          const response = await fetch(
            `http://localhost:5000/api/artist/profile?email=${userEmail}`,
            { credentials: "include" }
          );
          const data = await response.json();

          if (response.ok) {
            setInitialValues(data);
          } else {
            toast.error(data.message || "Failed to load profile.");
          }
        } catch (error) {
          toast.error("Error fetching profile data.");
        }
      } else {
        const saved = getFormData("page1");
        if (saved) {
          setInitialValues({ ...defaultValues, ...saved });
        }
      }
    };

    fetchProfile();
  }, [mode, userEmail]);

  const formik = useFormik<ArtistFormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: personalSchema,
    onSubmit: async (values) => {
      try {
        
        const response = await fetch("http://localhost:5000/api/artist/profile", {
          method: mode === "edit" ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(mode === "edit" ? "Profile updated!" : "Profile submitted!");
          navigate(
            mode === "edit"
              ? `/app/dashboard/${+step + 1}?mode=edit`
              : `/app/dashboard/${+step + 1}`
          );
        } else {
          toast.error(data.message || "Submission failed.");
        }
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
  });

  const handleSaveDraft = () => {
    saveFormData("page1", formik.values);
    toast.success("Draft saved!");
  };

  return (
    <div className="max-w-5xl mx-auto mb-7 px-6 py-10 bg-white rounded-xl shadow">
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ id, label, type, placeholder, options }) => (
          <div key={id} className={id === "shortBio" ? "md:col-span-2" : ""}>
            <label htmlFor={id} className="block font-medium mb-1">
              {label}
            </label>

            {type === "textarea" ? (
              <textarea
                id={id}
                name={id}
                value={formik.values[id as keyof ArtistFormValues]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={placeholder}
                className="w-full border border-gray-300 p-2 rounded h-28"
              />
            ) : type === "select" && options ? (
              <select
                id={id}
                name={id}
                value={formik.values[id as keyof ArtistFormValues]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Choose</option>
                {options.map((opt, index) => (
                  <option key={`${opt}-${index}`} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={id}
                type="text"
                value={formik.values[id as keyof ArtistFormValues]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={placeholder}
                className="w-full border border-gray-300 p-2 rounded"
              />
            )}

            {formik.errors[id as keyof ArtistFormValues] &&
              formik.touched[id as keyof ArtistFormValues] && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors[id as keyof ArtistFormValues]}
                </p>
              )}
          </div>
        ))}

        <div className="md:col-span-2 flex justify-between mt-6">
          <button
            type="button"
            className="text-red-600 font-medium border px-4 py-1 rounded border-red-600 hover:bg-red-50"
            onClick={handleSaveDraft}
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
      </form>
    </div>
  );
};
