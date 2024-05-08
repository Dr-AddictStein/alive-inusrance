import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import arrow1 from "../../../../assets/dashboard/FeatherIcon.png";
import arrow2 from "../../../../assets/dashboard/Feather-Icon.png";
import { IoIosCheckmarkCircle } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";
import AliveDemo from "../../../Shared/AliveDemo";
import AllowAccess from "../../../Shared/AllowAccess";
import Select from "react-select";
import Trstep1 from "./Trstep1";
import TrStep2 from "./TrStep2";

const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
];

const CreateNewTransaction = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [access, setAccess] = useState(false);


  const previousStep = () => {
    setActiveStep(activeStep - 1);
    setAccess(false);
  };

  const nextStep = () => {
    setActiveStep(activeStep + 1);
    setAccess(false);
  };

  const isLastStep = activeStep === 3;

  const handleButtonClick = () => {
    if (isLastStep) {
      toast.success("Form submitted successfully");
      setActiveStep(4);
    } else {
      nextStep();
    }
  };

  

  return (
    <div className="max-w-[1164px] mx-auto rounded-lg">
      <div className="py-10">
        <h2 className="sr-only">Steps</h2>

        <div className="after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200">
          <ol className="grid grid-cols-4 text-sm font-medium text-gray-500">
            <li className="relative flex justify-start text-blue-600">
              <span
                className={`absolute -bottom-[1.75rem] start-0 border border-gray-400 w-6 h-6 flex justify-center items-center rounded-full text-black ${
                  activeStep === 1 ? "bg-[#5D656A] text-white" : "bg-white"
                }`}
              >
                {activeStep === 2 || activeStep === 3 || activeStep === 4 ? (
                  <IoIosCheckmarkCircle className="h-6 w-6 text-[#5D656A]" />
                ) : (
                  <h1>1</h1>
                )}
              </span>

              <span
                className={`hidden sm:block absolute text-sm -bottom-[3.75rem] -left-7 text-center ${
                  activeStep === 1 ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {" "}
                ERP and Bank{" "}
              </span>
            </li>

            <li className="relative flex justify-center text-blue-600">
              <span
                className={`absolute -bottom-[1.75rem] -ml-10  border border-gray-400 w-6 h-6 flex justify-center items-center rounded-full text-black ${
                  activeStep === 2 ? "bg-[#5D656A] text-white" : "bg-white"
                }`}
              >
                {activeStep === 3 || activeStep === 4 ? (
                  <IoIosCheckmarkCircle className="h-6 w-6 text-[#5D656A]" />
                ) : (
                  <h1>2</h1>
                )}
              </span>

              <span
                className={`hidden sm:block absolute right-16 text-sm -bottom-[3.75rem] ${
                  activeStep === 2 ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Select Bills{" "}
              </span>
            </li>

            <li className="relative flex justify-center text-blue-600">
              <span
                className={`absolute -bottom-[1.75rem] ml-16 border border-gray-400 w-6 h-6 flex justify-center items-center rounded-full text-black ${
                  activeStep === 3 ? "bg-[#5D656A] text-white" : "bg-white"
                }`}
              >
                {activeStep === 4 ? (
                  <IoIosCheckmarkCircle className="h-6 w-6 text-[#5D656A]" />
                ) : (
                  <h1>3</h1>
                )}
              </span>

              <span
                className={`hidden sm:block absolute text-sm -bottom-[3.75rem] text-center -right-3 ${
                  activeStep === 3 ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {" "}
                Review and Submit{" "}
              </span>
            </li>
          </ol>
        </div>
      </div>

      {/* here contents */}
      <div className="">
        {activeStep === 1 && (
          <>
            <div className="max-w-[400px] mx-auto py-20 space-y-5">
              <Trstep1/>
              <div className="mt-4">
                <div className="flex justify-center items-center gap-5 py-20">
                  {/* Here all buttons */}
                  <button
                    disabled
                    onClick={previousStep}
                    className="bg-transparent border border-gray-400 text-black px-10  py-2 rounded "
                  >
                    Cancel
                  </button>
                  {!isLastStep && (
                    <div
                      onClick={handleButtonClick}
                      className="flex cursor-pointer justify-center items-center gap-2 bg-[#AEB2B4] px-10"
                    >
                      <button className=" text-white py-2 rounded">
                        Next{" "}
                      </button>
                      <img src={arrow2} alt="" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {activeStep === 2 && (
          <div className="">
            <TrStep2/>
            <div className="flex justify-between items-center gap-5 py-10">
              {activeStep > 1 && (
                <div className="px-10 flex justify-center items-center gap-2">
                  <img src={arrow1} alt="" />
                  <button
                    onClick={previousStep}
                    className=" text-gray-400 py-2 rounded "
                  >
                    Previous
                  </button>
                </div>
              )}

              <div className="flex justify-center items-center gap-5">
                {/* Here all buttons */}
                <button
                  onClick={previousStep}
                  className="bg-transparent border border-gray-400 text-black px-10  py-2 rounded "
                >
                  Cancel
                </button>
                {!isLastStep && (
                  <div
                    onClick={handleButtonClick}
                    className="flex cursor-pointer justify-center items-center gap-2 bg-[#AEB2B4] px-10"
                  >
                    <button className=" text-white py-2 rounded ">Next </button>
                    <img src={arrow2} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="py-20">
            <div className="max-w-[400px] mx-auto ">
              <div className="mt-4 relative">
                <label className="block text-sm font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
                  Client ID
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full pr-10 py-3 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 placeholder:text-blue-500 pl-5 focus:border-blue-500 sm:text-sm rounded-md"
                  placeholder="xeroorgdefclient"
                />
              </div>
              <div className="mt-4 relative">
                <label className="block text-sm font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
                  Client Secret
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full pl-5 pr-10 py-3 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 placeholder:text-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  placeholder="**********"
                />
              </div>
              <div className="mt-6 relative">
                <label className="block text-sm z-50 font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
                  Select Organization
                </label>
                <Select
                  defaultValue={[]}
                  isMulti
                  name="colors"
                  options={colourOptions}
                  className=""
                  classNamePrefix="select"
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-5 py-20">
              {activeStep > 1 && (
                <div className="px-10 flex justify-center items-center gap-2">
                  <img src={arrow1} alt="" />
                  <button
                    onClick={previousStep}
                    className=" text-gray-400 py-2 rounded"
                  >
                    Previous
                  </button>
                </div>
              )}

              <div className="flex justify-center items-center gap-5">
                <button
                  onClick={previousStep}
                  className="bg-transparent border border-gray-400 text-black px-10  py-2 rounded "
                >
                  Cancel
                </button>
                {!isLastStep && (
                  <div
                    onClick={handleButtonClick}
                    className="flex cursor-pointer justify-center items-center gap-2 bg-[#AEB2B4] px-10"
                  >
                    <button className=" text-white py-2 rounded ">Next </button>
                    <img src={arrow2} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className=" py-20">
            <div className="max-w-[400px] mx-auto space-y-4">
              <div className="mt-4 relative">
                <label className="block text-sm font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
                  ERP Application
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full pr-10 py-3 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 placeholder:text-blue-500 pl-5 focus:border-blue-500 sm:text-sm rounded-md"
                  placeholder="Xero"
                />
              </div>
              <div className="mt-4 relative">
                <label className="block text-sm font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
                  Xero Client ID
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full pr-10 py-3 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 placeholder:text-blue-500 pl-5 focus:border-blue-500 sm:text-sm rounded-md"
                  placeholder="xeroorgdefclient"
                />
              </div>
              <div className="mt-4 relative">
                <label className="block text-sm font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
                  Client Secret
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full pl-5 pr-10 py-3 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 placeholder:text-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  placeholder="**********"
                />
              </div>
              <div className="mt-6 relative">
                <label className="block text-sm z-50 font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
                  Select Organization
                </label>
                <Select
                  defaultValue={[]}
                  isMulti
                  name="colors"
                  options={colourOptions}
                  className=""
                  classNamePrefix="select"
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-5 py-10">
              {activeStep > 1 && (
                <div className="px-10 flex justify-center items-center gap-2">
                  <img src={arrow1} alt="" />
                  <button
                    onClick={previousStep}
                    className=" text-gray-400 py-2 rounded"
                  >
                    Previous
                  </button>
                </div>
              )}

              <div className="flex justify-center items-center gap-5">
                <button
                  onClick={previousStep}
                  className="bg-transparent border border-gray-400 text-black px-10  py-2 rounded"
                >
                  Cancel
                </button>

                {isLastStep && (
                  <button
                    onClick={handleButtonClick}
                    className="bg-[#AEB2B4] px-10 text-white py-2 rounded "
                  >
                    Active
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNewTransaction;
