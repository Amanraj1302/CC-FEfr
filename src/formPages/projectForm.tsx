import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { UploadBanner } from '../constants/uploadPdf';
import { projectValidationSchema } from '../Schemas/projectSchema';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
//import { useAuth } from '../context/AuthContext';

const initialValues = {
  projectName: '',
  typeOfProject: '',
  description: '',
  castingStart: '',
  castingEnd: '',
  castingCity: '',
  castingState: '',
  castingCountry: '',
  shootingStart: '',
  shootingEnd: '',
  shootingCity: '',
  shootingState: '',
  shootingCountry: '',
  role: '',
  gender: '',
  ageRange: '',
  language: '',
  banner: null,
};

const FormError = ({ name }: { name: string }) => (
  <ErrorMessage name={name} component="div" className="text-sm text-red-500 mt-1" />
);

const fieldConfig = [
  { name: 'projectName', label: 'Project name', type: 'text', placeholder: 'Enter project name' },
  { name: 'typeOfProject', label: 'Type of project', type: 'select', options: ['', 'film', 'ad', 'web-series'] },
  { name: 'description', label: 'Project description', type: 'textarea', placeholder: 'Explain the project briefly' },
  { name: 'castingCity', label: 'Casting City', type: 'text', placeholder: 'City' },
  { name: 'castingState', label: 'Casting State', type: 'select', options: ['', 'Delhi', 'Maharashtra'] },
  { name: 'castingCountry', label: 'Casting Country', type: 'select', options: ['', 'India', 'Other'] },
  { name: 'shootingCity', label: 'Shooting City', type: 'text', placeholder: 'City' },
  { name: 'shootingState', label: 'Shooting State', type: 'select', options: ['', 'UP', 'Goa'] },
  { name: 'shootingCountry', label: 'Shooting Country', type: 'select', options: ['', 'India', 'Other'] },
  { name: 'role', label: 'Role', type: 'text', placeholder: 'Enter role' },
  { name: 'gender', label: 'Gender', type: 'select', options: ['', 'Male', 'Female'] },
  { name: 'ageRange', label: 'Age Range', type: 'select', options: ['', '18-25', '26-40'] },
  { name: 'language', label: 'Language', type: 'text', placeholder: 'Enter language' },
];

export const ProjectForm: React.FC = () => {
  //const { userEmail } = useAuth();
  const navigate = useNavigate()  ;
 const handleSubmit = async (values: any, { resetForm }: any) => {
  try {
    const formData = new FormData();
   // formData.append("email", userEmail);
    // Append all form fields
    for (const key in values) {
      if (key !== "banner") {
        formData.append(key, values[key]);
      }
    }

    // Append banner file
    formData.append("banner", values.banner);

    const response = await fetch("http://localhost:5000/api/project/create", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Project created successfully");
      console.log(data);
      resetForm();
      navigate("/home")
    } else {
      toast.error(data.error || "Something went wrong");
      console.error(data);
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("An error occurred while submitting the form.");
  }
};


  type FieldConfigItem = {
    name: string;
    label: string;
    type: string;
    options?: string[];
    placeholder?: string;
  };

  const renderField = ({ name, label, type, options, placeholder }: FieldConfigItem) => (
    <div key={name}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === 'select' ? (
        <Field as="select" name={name} className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-md">
          {options?.map((opt) => (
            <option key={opt} value={opt}>{opt || 'Select'}</option>
          ))}
        </Field>
      ) : type === 'textarea' ? (
        <Field as="textarea" name={name} placeholder={placeholder} className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-md" />
      ) : (
        <Field type={type} name={name} placeholder={placeholder} className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-md" />
      )}
      <FormError name={name} />
    </div>
  );

  return (
    <div className="w-full flex items-center justify-center pt-20 px-4">
      <div className="w-[70%] mx-auto mb-7 px-6 py-10 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Create your project</h2>
        <p className="text-gray-600 mb-6">
          Fill in your information to create the project and select the artist.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={projectValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fieldConfig.slice(0, 2).map(renderField)}
            </div>

            {renderField(fieldConfig[2])} {/* Description */}

            <div>
              <h3 className="font-semibold text-gray-800">Casting date</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                {['castingStart', 'castingEnd'].map((name) => (
                  <div key={name}>
                    <label className="text-sm text-gray-600">{name.includes('Start') ? 'Start date' : 'End date'}</label>
                    <Field type="date" name={name} className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-md" />
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
                {['shootingStart', 'shootingEnd'].map((name) => (
                  <div key={name}>
                    <Field type="date" name={name} className="border border-gray-300 px-4 py-2 rounded-md" />
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

            <div>
              <UploadBanner />
              <FormError name="banner" />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200"
              >
                Create project
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
