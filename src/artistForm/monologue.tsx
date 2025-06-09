import React from "react";
import { useFormik } from "formik";
import { monologueSchema } from "../Schemas/artistSchema";
import { useNavigate, useParams } from "react-router-dom";

interface DialectFormValues {
    haryanvi: string;
    rajasthani: string;
    bhojpuri: string;
    awadhi: string;
    maithili: string;
}


export const DialectVideoForm: React.FC = () => {
    const formik = useFormik<DialectFormValues>({
        initialValues: {
            haryanvi: "",
            rajasthani: "",
            bhojpuri: "",
            awadhi: "",
            maithili: "",
        },
        validationSchema: monologueSchema,
        onSubmit: (values) => {
            console.log("Submitted values:", values);

        },
    });

    const navigate = useNavigate();
    const step = useParams<{ step: string }>().step || "";

    return (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow">

            <form onSubmit={formik.handleSubmit}>

                <h2 className="text-xl font-semibold text-gray-800">
                    Upload YouTube Links for Regional Dialects
                </h2>

                {[
                    { label: "Youtube link (Haryanvi)", name: "haryanvi" },
                    { label: "Youtube link (Rajasthani)", name: "rajasthani" },
                    { label: "Youtube link (Bhojpuri)", name: "bhojpuri" },
                    { label: "Youtube link (Awadhi)", name: "awadhi" },
                    { label: "Youtube link (Maithili)", name: "maithili" },
                ].map(({ label, name }) => (
                    <div key={name}>
                        <label htmlFor={name} className="block font-medium text-gray-700">
                            {label}
                        </label>
                        <input
                            type="url"
                            id={name}
                            name={name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values[name as keyof DialectFormValues]}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="https://youtu.be/yourvideoreel"
                        />
                        {formik.touched[name as keyof DialectFormValues] &&
                            formik.errors[name as keyof DialectFormValues] && (
                                <div className="text-red-500 text-sm mt-1">
                                    {formik.errors[name as keyof DialectFormValues]}
                                </div>
                            )}
                    </div>
                ))}
                <h3 className="text-lg font-bold text-red-600">
                    Guidelines for the Intro Video with one Monologue in Actor Mother Tongue
                </h3>

                <div>
                    <h4 className="font-semibold">1. Language and Dialect (Speak in the required dialect):</h4>
                    <p>
                        Use only the dialect requested (Haryanvi, Rajasthani, Bhojpuri, Awadhi, Maithili, or others
                        as specified). Make sure your accent and tone are authentic to the dialect. Avoid mixing
                        languages. Stick strictly to the dialect without introducing Hindi or English unless
                        specified.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold">2. Introduction Content Start with a clear introduction:</h4>
                    <ul className="list-disc ml-5">
                        <li>Greet in the respective dialect.</li>
                        <li>Mention your full name.</li>
                        <li>Specify your age.</li>
                        <li>State your height (in feet and inches).</li>
                        <li>Mention your current location (city, state).</li>
                    </ul>

                    <p className="mt-2 font-medium">Acting experience:</p>
                    <p>
                        Briefly mention your acting experience (if any), including theatre, television, or film work,
                        especially in the regional language.
                    </p>

                    <p className="mt-2 font-medium">Language proficiency:</p>
                    <p>
                        If you speak more than one dialect from the region (e.g., Haryanvi and Bhojpuri), mention your
                        fluency level.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold">3. Personality and expression be natural:</h4>
                    <p>
                        Keep your tone conversational and relaxed. Avoid over-acting, and show your real personality.
                    </p>

                    <p className="mt-2 font-semibold">Keep it engaging:</p>
                    <p>
                        Use appropriate expressions and body language that suit the dialect and reflect your character
                        in a natural, confident way.
                    </p>
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => navigate(`/app/dashboard/${+step -1}`)}

                        className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                    >
                        Back
                    </button>
                    <div >
                        <button type="button" className="text-red-600 font-medium mr-4">Save Draft</button>
                        <button type="submit"
                            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                        >
                            Submit
                        </button>
                    </div>
                </div>


            </form>
        </div>


    );
};
