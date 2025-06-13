import React from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import upload from '../assets/upload.png';
import { uploadPhotosSchema } from "../Schemas/artistSchema";
import { useAuth } from "../context/AuthContext";
type UploadSection = {
  id: string;
  title: string;
  description: string;
  optional?: boolean;
  sampleImage: string;
};

const uploadSections: UploadSection[] = [
  {
    id: "headshot",
    title: "1. Head shots (Primary Requirement) - Standard Head shot",
    description:
      "A close-up image that shows your face clearly, from the shoulders up. Your facial expression should be neutral, relaxed, and natural. Use a plain, neutral background like white or light gray.",
    sampleImage: "/images/headshot-sample.jpg",
  },
  {
    id: "smilingHeadshot",
    title: "Smiling Headshot",
    description: "Another version with a friendly, natural smile.",
    sampleImage: "/images/smiling-headshot-sample.jpg",
  },
  {
    id: "fullBody",
    title: "2. Full-Body Shots",
    description:
      "A full-body image showing your posture and physique. Stand upright with a neutral expression or a natural smile.",
    sampleImage: "/images/full-body-sample.jpg",
  },
  {
    id: "threeQuarter",
    title: "3. Three-Quarter Shots",
    description:
      "This image captures you from the knees or waist up. It's used to show your overall appearance while keeping focus on your face and upper body.",
    sampleImage: "/images/three-quarter-sample.jpg",
  },
  {
    id: "profile",
    title: "4. Profile Shots (Optional)",
    description:
      "A side-profile shot is sometimes requested to see different angles of your face.",
    sampleImage: "/images/profile-sample.jpg",
    optional: true,
  },
];

type uploadFormValues = {
  [key: string]: File | null;
};

export const UploadPhotos: React.FC = () => {
const initialValues: uploadFormValues = uploadSections.reduce(
    (acc, section) => ({ ...acc, [section.id]: null }),
    {}
  );
  function onBack(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }
  const step = useParams<{ step: string }>().step || "";
  const {userEmail}= useAuth();
  const navigate = useNavigate();
 const _handleSubmit = async (values: any) => {
  const formData = new FormData();

  // Include the email field
  formData.append("email", userEmail);

  // Add each file if present
  Object.entries(values).forEach(([key, file]) => {
    if (file) {
      formData.append(key, file as File);
    }
  });

  try {
    const res = await fetch("http://localhost:5000/api/artist/upload", {
      method: "PUT",
      body: formData, 
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Photos submitted!");
      navigate(`/app/dashboard/${+step + 1}`);
    } else {
      toast.error(data.message || "Upload failed");
    }
  } catch (err) {
    console.error("Submit error:", err);
    toast.error("Something went wrong");
  }
};

  return (
    
    <Formik
      initialValues={initialValues}
      validationSchema={uploadPhotosSchema}
      onSubmit={_handleSubmit}
    >
      {({ setFieldValue, handleSubmit, values, errors, touched }) => (
        <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto mb-7 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">Upload Photos</h2>
          <p className="text-gray-600">
            (Read the guidelines before uploading)
          </p>

          {uploadSections.map(({ id, title, description, optional }) => (
            <div key={id} className="space-y-4 border-b pb-6">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
              <div className="flex items-center gap-6">
                <label htmlFor={id} className="cursor-pointer relative group">
                  <div className="w-24 h-24 rounded overflow-hidden border border-gray-300 group-hover:ring-2 group-hover:ring-red-500">
                    <img
                      src={
                        values[id]
                          ? URL.createObjectURL(values[id] as File)
                          : upload
                      }
                      alt="Upload"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    id={id}
                    name={id}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFieldValue(id, e.currentTarget.files?.[0] || null)
                    }
                    className="hidden"
                  />
                </label>

                <div>
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum photo upload size is 5 MB. {optional && "(Optional)"}
                  </p>
                  {values[id] && (
                    <p className="text-green-500 text-sm mt-1">
                      Selected: {values[id]?.name}
                    </p>
                  )}
                  {errors[id] && touched[id] && (
                    <p className="text-sm text-red-500 mt-1">{errors[id] as string}</p>
                  )}
                </div>
              </div>

            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => { navigate(`/app/dashboard/${+step - 1}`) }} className="px-4 py-2 border border-red-500 text-red-500 rounded">
              Back
            </button>
            <div>
              <button type="button" className="text-red-600 font-medium mr-4">Save Draft</button>
              <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
                Next
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
    
  );
};
