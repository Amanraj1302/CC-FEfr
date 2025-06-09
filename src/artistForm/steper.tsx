import React, { use } from "react";
import { User, Briefcase, ImageIcon, Video } from "lucide-react";
import { useParams } from "react-router-dom";


const steps = [
  { label: "Personal", icon: <User size={20} /> },
  { label: "Professional", icon: <Briefcase size={20} /> },
  { label: "Photos", icon: <ImageIcon size={20} /> },
  { label: "Monologue", icon: <Video size={20} /> },
];

type StepperProps = {
  currentStep: number;
};

let currentStep = 0;

export const Stepper: React.FC<StepperProps> = () => {
  const step = useParams<{ step: string }>().step || "";
  currentStep = Number(step);
  return (
    
    <div className="w-full bg-white  rounded-lg p-2 mb-6  ">
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between items-center w-full max-w-3xl px-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center w-full relative ">
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
                  ${index === currentStep
                    ? "bg-red-500 text-white border-red-500"
                    : index < currentStep
                     ? ""
                     : "border-gray-300 text-gray-400"
                  }`}
              >
                {step.icon}
              </div>
              <span
                className={`mt-1 text-sm ${index === currentStep ? "text-red-500 font-semibold" : "text-gray-500"
                  }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-auto h-0.5 bg-gray-300 mx-2">
                <div
                  className={`h-0.5 ${index < currentStep ? "bg-red-500" : "bg-gray-300"} w-full`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};
