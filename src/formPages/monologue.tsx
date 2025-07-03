import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { monologueSchema } from "../Schemas/artistSchema";
import { useAuth } from "../context/AuthContext";
import { saveFormData, getFormData } from "../utils/localStorageHelper";

interface DialectFormValues {
    haryanvi: string;
    rajasthani: string;
    bhojpuri: string;
    awadhi: string;
    maithili: string;
}

const defaultValues: DialectFormValues = {
    haryanvi: "",
    rajasthani: "",
    bhojpuri: "",
    awadhi: "",
    maithili: "",
};

export const DialectVideoForm: React.FC = () => {
    const { userEmail } = useAuth();
    const navigate = useNavigate();
    const step = useParams<{ step: string }>().step || "";
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");

    const [initialValues, setInitialValues] = useState<DialectFormValues>(defaultValues);

    // 🆕 Updated to parse the monologues array correctly
    const extractMonologueData = (data: any): DialectFormValues => {
        const result: DialectFormValues = { ...defaultValues };

        if (Array.isArray(data.monologues)) {
            data.monologues.forEach((m: any) => {
                const lang = m.language?.toLowerCase();
                if (lang && lang in result) {
                    result[lang as keyof DialectFormValues] = m.url;
                }
            });
        }

        return result;
    };

    useEffect(() => {
        const fetchMonologues = async () => {
            if (mode === "edit") {
                try {
                    const res = await fetch(`http://localhost:5000/api/artist/monologue?email=${userEmail}`, {
                        credentials: "include",
                    });
                    const data = await res.json();
                    if (res.ok) {
                        const cleaned = extractMonologueData(data);
                        setInitialValues(cleaned);
                    } else {
                        toast.error(data.message || "Failed to load monologue data");
                    }
                } catch (err) {
                    toast.error("Error fetching monologue data");
                }
            } else {
                const saved = getFormData();
                if (saved) {
                    setInitialValues({ ...defaultValues, ...saved });
                }
            }
        };

        fetchMonologues();
    }, [mode, userEmail]);

    const handleSubmit = async (values: DialectFormValues) => {
        try {
            const payload = {
                email: userEmail,
                monologues: Object.entries(values).map(([language, url]) => ({
                    language: language.charAt(0).toUpperCase() + language.slice(1),
                    url,
                })),
            };

            const res = await fetch("http://localhost:5000/api/artist/monologue", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(mode === "edit" ? "Profile updated!" : "Monologue info submitted!");
                navigate( "/home");
            } else {
                toast.error(data.message || "Submission failed");
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    const handleSaveDraft = (values: DialectFormValues) => {
        saveFormData(values);
        toast.success("Draft saved!");
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={monologueSchema}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
                <form
                    onSubmit={handleSubmit}
                    className="space-y-10 max-w-4xl mx-auto mb-7 bg-white p-6 rounded-xl shadow"
                >
                    <h2 className="text-xl font-semibold text-gray-800">
                        Upload YouTube Links for Regional Dialects
                    </h2>

                    {Object.entries(defaultValues).map(([key, _]) => (
                        <div key={key}>
                            <label htmlFor={key} className="block font-medium text-gray-700">
                                YouTube Link ({key.charAt(0).toUpperCase() + key.slice(1)})
                            </label>
                            <input
                                type="url"
                                id={key}
                                name={key}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values[key as keyof DialectFormValues]}
                                className="mt-1 w-full border border-gray-300 rounded 
                px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="https://youtu.be/yourvideoreel"
                            />
                            {touched[key as keyof DialectFormValues] && errors[key as keyof DialectFormValues] && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors[key as keyof DialectFormValues]}
                                </div>
                            )}
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
                            className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                        >
                            Back
                        </button>
                        <div>
                            <button
                                type="button"
                                onClick={() => handleSaveDraft(values)}
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
