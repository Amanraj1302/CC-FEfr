import React, { useEffect } from "react";
import { Formik, useFormikContext } from "formik";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import upload from "../assets/upload.png";
import { uploadPhotosSchema } from "../Schemas/artistSchema";
import { useAuth } from "../context/AuthContext";
import { saveFormData, getFormData } from "../utils/localStorageHelper";

const uploadSections = [
  { id: "headshot", title: "Headshot", description: "Standard headshot", sampleImage: "/images/headshot.jpg" },
  { id: "smilingHeadshot", title: "Smiling Headshot", description: "With smile", sampleImage: "/images/smiling.jpg" },
  { id: "fullBody", title: "Full Body", description: "Full-body shot", sampleImage: "/images/full.jpg" },
  { id: "threeQuarter", title: "Three Quarter", description: "Waist-up shot", sampleImage: "/images/three.jpg" },
  { id: "profile", title: "Profile", description: "Side profile", sampleImage: "/images/profile.jpg", optional: true },
];

const getPreviewURL = (val: any) => {
  if (val instanceof File) return URL.createObjectURL(val);
  if (typeof val === "string") {
    if (val.startsWith("data:image")) return val;
    return `http://localhost:5000/uploads/${val}`;
  }
  return upload;
};

// ✅ Create a component for fetching photos
const FetchUploadedPhotos: React.FC<{ mode: string | null; email: string }> = ({ mode, email }) => {
  const { setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    const fetchPhotos = async () => {
      if (mode === "edit" ) {
        try {
          const res = await fetch(`http://localhost:5000/api/artist/upload?email=${email}`, {
            credentials: "include",
          });
          const data = await res.json();

          if (res.ok) {
            (data.photos || []).forEach((photoPath: string) => {
              const fileName = photoPath.split('/').pop()?.split('.')[0];
              if (fileName) setFieldValue(fileName, photoPath);
            });
          } else {
            toast.error(data.message || "Failed to load photos");
          }
        } catch (err) {
          console.error(err);
          toast.error("Error fetching photos");
        }
      }
    };
    fetchPhotos();
  }, [mode, email, setFieldValue]);

  return null; // 🔥 This component only runs side effect
};

export const UploadPhotos: React.FC = () => {
  const storedData = getFormData();
  const { userEmail } = useAuth();
  const navigate = useNavigate();
  const step = useParams<{ step: string }>().step || "1";
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode");

  const initialValues = uploadSections.reduce((acc, { id }) => {
    const stored = storedData?.[id];
    if (stored?.startsWith("data:image")) {
      acc[id] = stored;
    } else {
      acc[id] = null;
    }
    return acc;
  }, {} as { [key: string]: any });

  const handleDraftSave = (values: any) => {
    const toSave = { ...getFormData() };
    for (const key in values) {
      const val = values[key];
      if (val instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          toSave[key] = reader.result;
          saveFormData(toSave);
        };
        reader.readAsDataURL(val);
      } else {
        toSave[key] = val;
        saveFormData(toSave);
      }
    }
    toast.success("Draft saved!");
  };

  const _handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("email", userEmail);
    for (const key in values) {
      const val = values[key];
      if (val instanceof File) {
        formData.append(key, val);
      }
    }

    try {
      const res = await fetch(`http://localhost:5000/api/artist/upload?email=${userEmail}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Photos submitted!");
        navigate(mode === "edit" ? `/app/dashboard/${+step + 1}?mode=edit` : `/app/dashboard/${+step + 1}`);
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
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
        <>
          {/* 🟢 Fetch component */}
          <FetchUploadedPhotos mode={mode} email={userEmail} />

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
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            toast.error("File too large. Max 5MB.");
                            return;
                          }
                          setFieldValue(id, file);

                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const base64 = reader.result;
                            const existing = getFormData();
                            saveFormData({ ...existing, [id]: base64 });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  <div>
                    <p className="text-xs text-gray-500">
                      Max photo size is 5MB {optional && "(Optional)"}
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
                onClick={() =>
                  navigate(
                    mode === "edit"
                      ? `/app/dashboard/${+step - 1}?mode=edit`
                      : `/app/dashboard/${+step - 1}`
                  )
                }
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
        </>
      )}
    </Formik>
  );
};
