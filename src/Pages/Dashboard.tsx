import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AvtarImage } from '../formPages/avtarImage';
import { Personal } from '../formPages/personal';
import { Stepper } from '../formPages/steper';
import { Professional } from '../formPages/professional';
import { UploadPhotos } from "../formPages/uploadPhotos";
import { DialectVideoForm } from '../formPages/monologue';


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
      <AvtarImage />
      <div className=" w-full mt-10 flex-row items-center justify-center     ">
        <Stepper currentStep={0} />
        {showStep(+step)}
      </div>
    </>
  );
};

