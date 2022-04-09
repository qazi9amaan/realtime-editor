import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./Homepage.module.css";
import NewRoom from "./Steps/NewRoom";
import JoinRoom from "./Steps/JoinRoom";

const steps = {
  0: NewRoom,
  1: JoinRoom,
};

const Step = ({ currentStep, setCurrentStep }) => {
  const StepComponent = steps[currentStep];
  return <StepComponent setCurrentStep={setCurrentStep} />;
};

const Homepage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className={style.bodyWrapper}>
      {<Step currentStep={currentStep} setCurrentStep={setCurrentStep} />}
    </div>
  );
};

export default Homepage;
