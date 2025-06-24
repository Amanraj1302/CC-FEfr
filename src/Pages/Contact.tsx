import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { MdCall, MdOutlineEmail } from "react-icons/md";
import {contactValidationSchema } from "../Schemas/contactSchema"

export const Contact = () => {
  const formFields = [
    { name: "fullName", label: "Full name", type: "text", placeholder: "Enter your full name", },
    { name: "email", label: "Email", type: "email", placeholder: "your@email.com", },
    { name: "phone", label: "Phone number", type: "tel", placeholder: "+91 1234567890", },
    { name: "message", label: "Message", type: "textarea", placeholder: "Write your message", },
  ];
  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    message: "",
  };
  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form submitted:", values);

  };
  return (
    <div className='w-full items-center mx-auto px-12 py-8'>
      <div className="w-full min-h-screen flex flex-col items-center justify-center  px-4 py-12">

        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-red-600 mb-10">
          Let's build something great—together.
        </h2>

        {/* Grid Layout */}
        <div className="max-w-6xl bg-white p-6 w-full grid grid-cols-1 md:grid-cols-2 gap-8 shadow-lg shadow-gray-300 rounded-lg">

          {/* Contact Info Box */}
          <div className="bg-[#062E3F] text-white p-8 rounded-lg shadow-md relative">
            <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
            <p className="text-sm mb-6 text-gray-300">Feel free to contact us</p>

            <div className="flex items-center gap-3 mb-4 font-semibold ">
              <span><MdCall className="text-2xl" /></span>
              <p className="text-sm">
                +91 9253420613 , 9911020613, 7404502740
              </p>
            </div>

            <div className="flex items-center gap-3 mb-6 font-semibold">
              <span><MdOutlineEmail className="text-2xl" /> </span>
              <p className="text-sm">castcrew2025@gmail.com</p>
            </div>

            <div className="absolute bottom-12 left-8 flex gap-6">
              <a href="https://www.facebook.com/" target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></a>
              <a href="https://www.instagram.com/" target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                  </path></svg></a>
            </div>

            <div className="absolute bottom-0 right-0">
              <div className="w-32 h-32 bg-white opacity-10 rounded-full absolute -bottom-4 -right-4"></div>
              <div className="w-20 h-20 bg-white opacity-10 rounded-full absolute bottom-8 right-8"></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg">
            <Formik initialValues={initialValues} validationSchema={contactValidationSchema} onSubmit={handleSubmit}>
              <Form className="space-y-6">
                {formFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>

                    {field.type === "textarea" ? (
                      <Field
                        as="textarea"
                        name={field.name}
                        rows={4}
                        placeholder={field.placeholder}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    ) : (
                      <Field
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    )}
                     {/* Error message */}
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-500 text-sm mt-1"
              />
                  </div>
                ))}

                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Send message
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
