import { Form, Formik } from 'formik';
import React from 'react'
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { saveFormData, getFormData, clearFormData } from '../utils/localStorageHelper';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
export const AvtarImage: React.FC = () => {
    const { userEmail } = useAuth();

    return (
        <div>
            <Formik
                initialValues={{ avatar: null, confirmed: false }}
                onSubmit={async (values) => {
                    try {
                        const formData = new FormData();
                        formData.append("artistDp", values.avatar as unknown as File);
                        formData.append("email", userEmail);
                        const response = await fetch(`http://localhost:5000/api/artist/artistDp/?email=${userEmail}`, {
                            method: "POST",
                            // headers: { "Content-Type": "multipart/form-data" },
                            credentials: "include",
                            body: formData,
                        })
                        const data = await response.json();

                        if (response.ok) {
                            toast.success("Artist profile submitted!");

                        } else {
                            toast.error(data.message || "Submission failed.");
                        }

                    } catch (err) {
                        toast.error("Something went wrong.");
                    }

                }}
            >
                {({ setFieldValue, values, submitForm }) => (
                    <Form className="flex flex-col items-center justify-start bg-white p-6 ">
                        <div className="flex flex-col md:flex-row mt-3 items-center gap-8 p-6">
                            <div className="flex flex-col items-center">
                                <label htmlFor="avatar" className="relative cursor-pointer group">
                                    <img
                                        src={
                                            values.avatar
                                                ? URL.createObjectURL(values.avatar as File)
                                                : "/icons/mdi_image-add.png"
                                        }
                                        alt="avatar"
                                        className="w-40 h-40 rounded-full object-cover border-4 border-red-500"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full group-hover:scale-105 transition-transform">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="avatar"
                                        name="avatar"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.currentTarget.files?.[0] || null;
                                            setFieldValue("avatar", file);
                                            setFieldValue("confirmed", false);
                                        }}
                                        className="hidden"
                                    />
                                </label>


                                {values.avatar && !values.confirmed && (
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFieldValue("confirmed", true);
                                                submitForm();
                                            }}
                                            className="text-xs px-1 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            <TiTick />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                document.getElementById("avatar")?.click();
                                            }}
                                            className="text-xs px-1 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            <RxCross2 />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-bold text-red-600">Artist Profile Setup</h2>
                                <p className="text-gray-600 text-lg max-w-md">
                                    Fill in your information to help talent seekers discover you easily.
                                </p>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

