import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { Personal } from '../artistForm/personal';
import { Stepper } from '../artistForm/steper';
import { Professional } from '../artistForm/professional';
import { UploadPhotos } from "../artistForm/uploadPhotos";
import { DialectVideoForm } from '../artistForm/monologue';


export const Dashboard: React.FC = () => {
  const { step = "" } = useParams<{ step: string }>();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  function showStep(currentStep: number) {
    switch (currentStep) {
      case 0:
        return <Personal />;
      case 1:
        return <Professional />;
      case 2:
        return <UploadPhotos />;
      case 3:
        return <DialectVideoForm />;
      default:
        return null;
    }
  }

  return (
    <>

      <Formik
        initialValues={{ avatar: null }}
        onSubmit={(values) => {
          console.log("Uploaded Avatar:", values.avatar);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col items-center justify-start  bg-white p-6">

            <div className="flex flex-col md:flex-row items-center  gap-8 p-6">

              <label htmlFor="avatar" className="relative cursor-pointer group">
                <img
                  src={
                    values.avatar
                      ? URL.createObjectURL(values.avatar as File)
                      : "/icons/mdi_image-add.png"
                  }
                  alt=""
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
                  onChange={(e) =>
                    setFieldValue("avatar", e.currentTarget.files?.[0] || null)
                  }
                  className="hidden"
                />
              </label>


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
      <div className=" w-full mt-10 flex-row items-center justify-center     ">
        <Stepper currentStep={0} />
        {showStep(+step)}
      </div>
    </>
  );
};

