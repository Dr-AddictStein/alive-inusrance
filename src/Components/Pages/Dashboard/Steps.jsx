import React, { useState } from 'react';

const Steps = () => {
    const [activeStep, setActiveStep] = useState(1);

    const handleStepClick = (step) => {
        setActiveStep(step);
    };

    const previousStep = () => {
        setActiveStep(activeStep - 1);
    };

    const nextStep = () => {
        setActiveStep(activeStep + 1);
    };

    const isLastStep = activeStep === 3; // Update this if the number of steps changes

    const handleButtonClick = () => {
        if (isLastStep) {
            console.log("Form submitted!");
            window.alert("Form Submitted Successfully!")
        } else {
            nextStep();
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <h2 className="text-2xl font-bold text-center py-4 bg-blue-600 text-white">Step {activeStep}</h2>

            <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
                <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                    <li
                        className={`flex items-center gap-2 bg-white p-2 ${activeStep === 1 ? 'bg-blue-600 text-white' : ''}`}
                        onClick={() => handleStepClick(1)}
                    >
                        <span className="size-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold"> 1 </span>

                        <span className="hidden sm:block"> Details </span>
                    </li>

                    <li
                        className={`flex items-center gap-2 bg-white p-2 ${activeStep === 2 ? 'bg-blue-600 text-white' : ''}`}
                        onClick={() => handleStepClick(2)}
                    >
                        <span className="size-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold"> 2 </span>

                        <span className="hidden sm:block"> Address </span>
                    </li>

                    <li
                        className={`flex items-center gap-2 bg-white p-2 ${activeStep === 3 ? 'bg-blue-600 text-white' : ''}`}
                        onClick={() => handleStepClick(3)}
                    >
                        <span className="size-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold"> 3 </span>

                        <span className="hidden sm:block"> Payment </span>
                    </li>
                </ol>
            </div>

            <div className="p-6">
                {activeStep > 1 && (
                    <button onClick={previousStep} className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 mb-2">Previous</button>
                )}

                {activeStep === 1 && (
                    <div>
                        Step 1 content goes here...
                    </div>
                )}

                {activeStep === 2 && (
                    <div>
                        Step 2 content goes here...
                    </div>
                )}

                {activeStep === 3 && (
                    <div>
                        Step 3 content goes here...
                    </div>
                )}
            </div>

            {!isLastStep && (
                <button onClick={handleButtonClick} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Next</button>
            )}
            {isLastStep && (
                <button onClick={handleButtonClick} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Submit</button>
            )}
        </div>
    );
};

export default Steps;
