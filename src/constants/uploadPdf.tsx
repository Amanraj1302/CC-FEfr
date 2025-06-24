import React, { useRef } from "react";
import { useFormikContext } from "formik";

interface FormValues {
  banner?: File;
  // add other fields if needed
}

 export const UploadBanner = () => {
  const { setFieldValue, values } = useFormikContext<FormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0];
    if (file) {
      setFieldValue("banner", file);
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-2">Upload banner</h3>

      <div
        className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <p className="font-medium mb-2">Drag and drop a file</p>
        <p className="text-sm mb-2">Upload 1 supported file: PDF, document, or image. Max 1 GB.</p>
        <p className="text-sm mb-4">Recommended size: 228x221 pixels</p>

        <button
          type="button"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Upload file
        </button>

        <input
          ref={fileInputRef}
          type="file"
          name="banner"
          accept=".pdf,image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {values.banner && (
          <p className="mt-3 text-green-600 text-sm">Selected: {values.banner.name}</p>
        )}
      </div>
    </div>
  );
};

