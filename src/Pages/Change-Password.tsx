import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../Schemas/chnagePassword";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
 const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const ChangePassword: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleVisibility = (field: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  };

 const handleSubmit = async (values: any, { resetForm }: any) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed to change password");
      return;
    }

    toast.success("Password changed successfully!");
    resetForm();
    navigate("/home");
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};


  const fields = [
    {
      name: "currentPassword",
      label: "Current Password",
      placeholder: "Enter current password",
    },
    {
      name: "newPassword",
      label: "New Password",
      placeholder: "Enter new password",
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Confirm new password",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white px-8 py-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2">Change Password</h2>
        <p className="text-center text-gray-600 mb-8">
          Please enter your current password and choose a new password.
        </p>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {fields.map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1">
                    {label}
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword[name as keyof typeof showPassword] ? "text" : "password"}
                      name={name}
                      placeholder={placeholder}
                      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <div
                      className="absolute right-3 top-2.5 cursor-pointer"
                      onClick={() => toggleVisibility(name)}
                    >
                      {showPassword[name as keyof typeof showPassword] ? (
                        <EyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                  <ErrorMessage
                    name={name}
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  isSubmitting ? "bg-gray-300" : "bg-red-600 hover:bg-red-700"
                } text-white py-2 rounded-md transition duration-200`}
              >
                {isSubmitting ? "Processing..." : "Change Password"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-red-600 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
