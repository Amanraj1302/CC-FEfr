import React from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import upload from "../assets/upload.png";
import { uploadPhotosSchema } from "../Schemas/artistSchema";
import { useAuth } from "../context/AuthContext";
import { saveFormData, getFormData } from "../utils/localStorageHelper";

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

type UploadFormValues = {
  [key: string]: File | null;
};

const getPreviewURL = (val: unknown): string => {
  if (val instanceof File) {
    return URL.createObjectURL(val);
  }
  if (typeof val === "string" && val.startsWith("data:image")) {
    return val;
  }
  return upload;
};

const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
};

export const UploadPhotos: React.FC = () => {
  const storedData = getFormData();

  const initialValues: UploadFormValues = uploadSections.reduce((acc, section) => {
    const base64 = storedData?.[section.id];
    if (base64?.startsWith("data:image")) {
      acc[section.id] = base64ToFile(base64, `${section.id}.jpg`);
    } else {
      acc[section.id] = null;
    }
    return acc;
  }, {} as UploadFormValues);

  const { userEmail } = useAuth();
  const navigate = useNavigate();
  const step = useParams<{ step: string }>().step || "1";

  const extractUploadData = (data: UploadFormValues) => {
    const cleaned: UploadFormValues = {};
    uploadSections.forEach(({ id }) => {
      cleaned[id] = data[id] || null;
    });
    return cleaned;
  };

  const _handleSubmit = async (values: UploadFormValues) => {
    const cleanedValues = extractUploadData(values);
    const formData = new FormData();
    formData.append("email", userEmail);

    Object.entries(cleanedValues).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      }
    });

    try {
      const res = await fetch(
        `http://localhost:5000/api/artist/upload?email=${userEmail}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

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

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    values: UploadFormValues,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Max size is 5MB.");
      return;
    }

    setFieldValue(id, file); // Save File in Formik state

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const currentStored = getFormData();
      saveFormData({ ...currentStored, [id]: base64 }); // Save base64 only to localStorage
    };
    reader.readAsDataURL(file);
  };

  const handleDraftSave = (values: UploadFormValues) => {
  const currentStored = getFormData();
  const updatedData = { ...currentStored };

  const readPromises = Object.entries(values).map(([key, val]) => {
    return new Promise<void>((resolve) => {
      if (val instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          updatedData[key] = base64;
          resolve();
        };
        reader.readAsDataURL(val);
      } else {
        resolve(); // skip if no file
      }
    });
  });

  Promise.all(readPromises).then(() => {
    saveFormData(updatedData);
    toast.success("Draft saved!");
  });
};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={uploadPhotosSchema}
      onSubmit={_handleSubmit}
    >
      {({ setFieldValue, handleSubmit, values, errors, touched }) => (
        <form
          onSubmit={handleSubmit}
          className="space-y-10 max-w-4xl mx-auto mb-7 bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-2xl font-bold">Upload Photos</h2>
          <p className="text-gray-600">(Read the guidelines before uploading)</p>

          {uploadSections.map(({ id, title, description, optional }) => (
            <div key={id} className="space-y-4 border-b pb-6">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
              <div className="flex items-center gap-6">
                <label htmlFor={id} className="cursor-pointer relative group">
                  <div className="w-24 h-24 rounded overflow-hidden border border-gray-300 group-hover:ring-2 group-hover:ring-red-500">
                    <img
                      src={getPreviewURL(values[id])}
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
                      handleFileChange(e, id, values, setFieldValue)
                    }
                    className="hidden"
                  />
                </label>

                <div>
                  <p className="text-xs text-gray-500 mt-1">
                    Max photo size is 5MB. {optional && "(Optional)"}
                  </p>
                  {values[id] instanceof File && (
                    <p className="text-green-500 text-sm mt-1">Image selected</p>
                  )}
                  {errors[id] && touched[id] && (
                    <p className="text-sm text-red-500 mt-1">{errors[id] as string}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate(`/app/dashboard/${+step - 1}`)}
              className="px-4 py-2 border border-red-500 text-red-500 rounded"
            >
              Back
            </button>
            <div>
              <button
                type="button"
                onClick={() => handleDraftSave(values)}
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

