import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { projectValidationSchema } from "../Schemas/projectSchema";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { indianStates, languages}from "../constants/indianStates"
const initialValues = {
  projectName: "",
  typeOfProject: "",
  description: "",
  castingStart: "",
  castingEnd: "",
  castingCity: "",
  castingState: "",
  castingCountry: "",
  shootingStart: "",
  shootingEnd: "",
  shootingCity: "",
  shootingState: "",
  shootingCountry: "",
  role: "",
  gender: "",
  ageRange: "",
  language: "",
  bannerPdf: null,
  bannerImage: null,
};

const FormError = ({ name }: { name: string }) => (
  <ErrorMessage
    name={name}
    component="div"
    className="text-sm text-red-500 mt-1"
  />
);

const fieldConfig = [
  { name: "projectName", label: "Project name", type: "text", placeholder: "Enter project name" },
  { name: "typeOfProject", label: "Type of project", type: "select", options: ["", "film", "ad", "web-series","drama"] },
  { name: "description", label: "Project description", type: "textarea", placeholder: "Explain the project briefly" },
  { name: "castingCity", label: "Casting City", type: "text", placeholder: "City" },
  { name: "castingState", label: "Casting State", type: "select", options:["Select ", ...indianStates]}, 
  { name: "castingCountry", label: "Casting Country", type: "select", options: ["", "India", "Other"] },
  { name: "shootingCity", label: "Shooting City", type: "text", placeholder: "City" },
  { name: "shootingState", label: "Shooting State", type: "select", options:["Select ", ... indianStates]},
  { name: "shootingCountry", label: "Shooting Country", type: "select", options: ["", "India", "Other"] },
  { name: "role", label: "Role", type: "text", placeholder: "Enter role" },
  { name: "gender", label: "Gender", type: "select", options: ["", "Male", "Female","Other"] },
  { name: "ageRange", label: "Age Range", type: "select", options: ["", "18-25", "26-40"] },
  { name: "language", label: "Language", type: "select", options: ["Select language", ...languages] },
];

const UploadBanner = ({
  setFieldValue,
  values,
}: {
  setFieldValue: (field: string, value: any) => void;
  values: any;
}) => {
  const DropzoneField = ({
    name,
    label,
    accept,
    maxSizeMB,
    file,
    helpText,
  }: {
    name: string;
    label: string;
    accept: string;
    maxSizeMB: number;
    file: File | string | null;
    helpText: string;
  }) => {
    console.log("DropzoneField file:", file);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: { [accept]: [] },
      maxFiles: 1,
      maxSize: maxSizeMB * 1024 * 1024,
      onDrop: (acceptedFiles) => {
        setFieldValue(name, acceptedFiles[0]);
      },
    });

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`mt-1 flex items-center justify-center border-2 border-dashed ${
            isDragActive ? "border-blue-400" : "border-gray-300"
          } rounded-md px-4 py-6 cursor-pointer text-gray-600`}
        >
          <input {...getInputProps()} />
          {file
            ? typeof file === "string"
              ? <span>Existing file available below</span>
              : <span>{file.name}</span>
            : <span>Drag & drop or click to upload</span>}
        </div>

        {/* Existing file link outside dropzone */}
        {typeof file === "string" && (
          <div className="mt-1">
            <a
              href={`http://localhost:5000${file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View existing file
            </a>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-1">{helpText}</p>
        <FormError name={name} />
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DropzoneField
        name="bannerPdf"
        label="Upload Banner PDF"
        accept="application/pdf"
        maxSizeMB={5}
        file={values.bannerPdf}
        helpText="PDF format only, max size 5MB"
      />
      <DropzoneField
        name="bannerImage"
        label="Upload Banner Image"
        accept="image/*"
        maxSizeMB={2}
        file={values.bannerImage}
        helpText="JPG/PNG/WEBP/JPEG format only, max size 2MB"
      />
    </div>
  );
};

export const ProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const projectId = searchParams.get("_id");

  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && projectId) {
      setLoading(true);
      fetch(`http://localhost:5000/api/project/${projectId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormInitialValues({
            ...initialValues,
            ...data,
            castingStart: data.castingStart?.slice(0, 10) || "",
            castingEnd: data.castingEnd?.slice(0, 10) || "",
            shootingStart: data.shootingStart?.slice(0, 10) || "",
            shootingEnd: data.shootingEnd?.slice(0, 10) || "",
            bannerPdf: data.bannerPdf || null,
            bannerImage: data.bannerImage || null,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load project data");
          setLoading(false);
        });
    }
  }, [mode, projectId]);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const formData = new FormData();

      for (const key in values) {
        if (key !== "bannerPdf" && key !== "bannerImage") {
          formData.append(key, values[key]);
        }
      }

      if (values.bannerPdf instanceof File) {
        formData.append("bannerPdf", values.bannerPdf);
      }
      if (values.bannerImage instanceof File) {
        formData.append("bannerImage", values.bannerImage);
      }

      const endpoint =
        mode === "edit" && projectId
          ? `http://localhost:5000/api/project/update/${projectId}`
          : "http://localhost:5000/api/project/create";

      const method = mode === "edit" ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          mode === "edit"
            ? "Project updated successfully"
            : "Project created successfully"
        );
        resetForm();
        navigate(-1);
      } else {
        toast.error(data.error || "Something went wrong");
        console.error(data);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const renderField = ({ name, label, type, options, placeholder }: any) => (
    <div key={name}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === "select" ? (
        <Field
          as="select"
          name={name}
          className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-md"
        >
          {options?.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt || "Select"}
            </option>
          ))}
        </Field>
      ) : type === "textarea" ? (
        <Field
          as="textarea"
          name={name}
          placeholder={placeholder}
          className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-md"
        />
      ) : (
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-md"
        />
      )}
      <FormError name={name} />
    </div>
  );

  if (loading) return <p>Loading project data...</p>;

  return (
    <div className="w-full flex items-center justify-center pt-20 px-4">
      <div className="w-[70%] mx-auto mb-7 px-6 py-10 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          {mode === "edit" ? "Update your project" : "Create your project"}
        </h2>
        <p className="text-gray-600 mb-6">
          Fill in your information to {mode === "edit" ? "update" : "create"} the project and select the artist.
        </p>

        <Formik
          enableReinitialize
          initialValues={formInitialValues}
          validationSchema={projectValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fieldConfig.slice(0, 2).map(renderField)}
              </div>

              {renderField(fieldConfig[2])}

              <div>
                <h3 className="font-semibold text-gray-800">Casting date</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  {["castingStart", "castingEnd"].map((name) => (
                    <div key={name}>
                      <label className="text-sm text-gray-600">
                        {name.includes("Start") ? "Start date" : "End date"}
                      </label>
                      <Field
                        type="date"
                        name={name}
                        className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-md"
                      />
                      <FormError name={name} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Casting location</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                  {fieldConfig.slice(3, 6).map(renderField)}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Shooting date</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  {["shootingStart", "shootingEnd"].map((name) => (
                    <div key={name}>
                      <Field
                        type="date"
                        name={name}
                        className="border border-gray-300 px-4 py-2 rounded-md"
                      />
                      <FormError name={name} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Shooting location</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                  {fieldConfig.slice(6, 9).map(renderField)}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Roles needed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  {fieldConfig.slice(9, 11).map(renderField)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {fieldConfig.slice(11, 13).map(renderField)}
                </div>
              </div>

              <UploadBanner setFieldValue={setFieldValue} values={values} />

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200"
                >
                  {mode === "edit" ? "Update project" : "Create project"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
