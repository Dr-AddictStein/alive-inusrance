import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import arrow1 from "../../../../assets/dashboard/FeatherIcon.png";
import arrow2 from "../../../../assets/dashboard/Feather-Icon.png";
import { IoIosCheckmarkCircle } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { TextField } from "@mui/material";
import Trstep1 from "./Trstep1";
import TrStep3 from "./TrStep3";

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

  const [sendTo3, setSendTo3] = useState([]);

  const handleButtonClick = () => {
    if (isLastStep) {
      toast.success("Form submitted successfully");
      setActiveStep(4);
    } else {
      if (activeStep === 2) {
        let temp3Dat = [];
        let taken = [];
        for (let i = 0; i < lineData.length; i++) {
          if (taken.includes(lineData[i].invID)) {
            continue;
          }
          for (let j = 0; j < invoices.length; j++) {
            let temp3;
            if (lineData[i].invID === invoices[j].InvoiceNumber) {
              taken.push(lineData[i].invID);
              temp3 = {
                Number: lineData[i].invID,
                Date: invoices[j].Date,
                DueDate: invoices[j].DueDate,
                VendorName: invoices[j].Contact.Name,
                InvoiceAmount: invoices[j].Total,
                Currency: invoices[j].CurrencyCode,
              };
              temp3Dat.push(temp3);
              break;
            }
          }
        }
        setSendTo3(temp3Dat);
        setSelectedVendor("");
        setDateFrom("");
        setDateTo("");
        setSelectedMultiValue([]);
        setInvoiceDex([]);
        settVendorName("");
        settVendorNumber("");
        setLineData([]);
      }
      nextStep();
    }
  };

  // Step 2 JS
  const [vendors, setVendors] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [selectedVendor, setSelectedVendor] = useState("");
  const handleOptionChangeForSelectorsVendor = (event) => {
    setSelectedVendor(event.target.value);
  };

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("/getVendors.json");
        if (!response.ok) {
          throw new Error("Could not fetch");
        }
        const data = await response.json();

        setVendors(data.Contacts);
      } catch (error) {
        console.log("could not fetch Vendors", error);
      }
    };
    fetchVendors();
  }, []);

  const [invoicesLoaded, setInvoicesLoaded] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/getInvoices(user).json");
        if (!response.ok) {
          throw new Error("Could not fetch");
        }
        const data = await response.json();

        setInvoices(data);
      } catch (error) {
        console.log("could not fetch Vendors", error);
      }
    };

    fetchInvoices();
  }, [invoicesLoaded]);

  const filteredInvoiceIDNums = [];

  for (let i = 0; i < invoices.length; i++) {
    if (invoices[i].Contact.Name === selectedVendor) {
      filteredInvoiceIDNums.push(invoices[i].InvoiceNumber);
    }
  }

  const options = filteredInvoiceIDNums.map((value) => ({
    value,
    label: value,
  }));

  const [selectedMultiValue, setSelectedMultiValue] = useState([]); // Single selected value (change to array for multiple)

  const handleChangeMulti = (selectedOption) => {
    setSelectedMultiValue(selectedOption); // Single value
  };

  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();

  const [tVendorName, settVendorName] = useState();
  const [tVendorNumber, settVendorNumber] = useState();
  const [invoiceDex, setInvoiceDex] = useState([]);
  const setupTable = () => {
    if (invoicesLoaded === false) {
      setInvoicesLoaded(true);
    }
    for (let i = 0; i < vendors.length; i++) {
      if (vendors[i].Name === selectedVendor) {
        settVendorName(selectedVendor);
        settVendorNumber(vendors[i].AccountNumber);
        break;
      }
    }

    let dex = [];
    for (let i = 0; i < selectedMultiValue.length; i++) {
      for (let j = 0; j < invoices.length; j++) {
        if (selectedMultiValue[i].value === invoices[j].InvoiceNumber) {
          const dateInputFrom = new Date(dateFrom);
          const dateInputTo = new Date(dateTo);
          const jsonDateString = invoices[j].Date;
          const jsonDateMilliseconds = parseInt(jsonDateString.match(/\d+/)[0]);
          const jsonDate=new Date(jsonDateMilliseconds)


          console.log("Date Check: ",dateInputFrom,dateInputTo,jsonDate)

          if(jsonDate>=dateInputFrom && jsonDate<=dateInputTo){
            dex.push(invoices[j]);
          }
        }
      }
    }

    setInvoiceDex(dex);
  };

  useEffect(() => {
    console.log("got 1", tVendorName, tVendorNumber);
    console.log("got tab", invoiceDex);
  }, [invoiceDex, tVendorName, tVendorNumber]);

  function formatDate(dateString) {
    // Extract the timestamp from the string
    const timestamp = parseInt(dateString.match(/\d+/)[0]);

    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Array of month names
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Get day, month, and year
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Format the date as "day month year"
    return `${day} ${month} ${year}`;
  }

  const [lineData, setLineData] = useState([]);

  const handleLineData = (e) => {
    const invoiceNumber = e.target.id;

    if (e.target.checked) {
      // Add the invoice line items to lineData if the checkbox is checked
      let tempArr = [];
      for (let i = 0; i < invoices.length; i++) {
        if (invoices[i].InvoiceNumber === invoiceNumber) {
          for (let j = 0; j < invoices[i].LineItems.length; j++) {
            tempArr.push({
              invID: invoices[i].InvoiceNumber,
              it: invoices[i].LineItems[j].Item,
              desc: invoices[i].LineItems[j].ItemDescription,
              quan: invoices[i].LineItems[j].Quantity,
              uprice: invoices[i].LineItems[j].UnitPrice,
              amount: invoices[i].LineItems[j].Amount,
            });
          }
        }
      }
      setLineData((prevLineData) => [...prevLineData, ...tempArr]);
    } else {
      // Remove the entire invoice data from lineData if the checkbox is unchecked
      setLineData((prevLineData) =>
        prevLineData.filter((item) => item.invID !== invoiceNumber)
      );
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto pt-10 rounded-lg">
      <h1 className="font-medium text-3xl mb-2">Create New Transaction</h1>
      <hr />
      <div className="py-10">
        <h2 className="sr-only">Steps</h2>

        <div className="after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200">
          <ol className="flex justify-between text-sm font-medium text-gray-500">
            <li className="relative flex justify-between text-blue-600">
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
                className={`hidden sm:block  text-sm -bottom-[3.75rem] -left-0 text-center ${
                  activeStep === 1 ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {" "}
                ERP and Bank{" "}
              </span>
            </li>

            <li className="relative flex justify-center text-blue-600">
              <span
                className={`absolute -bottom-[1.75rem] left-16 -ml-10  border border-gray-400 w-6 h-6 flex justify-center items-center rounded-full text-black ${
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
                className={`hidden sm:block  right-16 text-sm -bottom-[3.75rem] ${
                  activeStep === 2 ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Select Bills{" "}
              </span>
            </li>

            <li className="relative flex justify-center text-blue-600">
              <span
                className={`absolute left-10 -bottom-[1.75rem] ml-16 border border-gray-400 w-6 h-6 flex justify-center items-center rounded-full text-black ${
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
                className={`hidden sm:block  text-sm -bottom-[3.75rem] text-center -right-3 ${
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
              <Trstep1 />
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
            <div className="mx-auto">
              <div className="flex gap-10 justify-around">
                <div className="mt-6 mb-5 relative w-1/3">
                  <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                    Vendor Name
                  </label>
                  <select
                    id="erpSelect"
                    name="erpSelect"
                    className="mt-1 text-blue-400 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500  sm:text-sm rounded-md"
                    value={selectedVendor}
                    onChange={handleOptionChangeForSelectorsVendor}
                  >
                    <option disabled value="">
                      Vendor Name
                    </option>
                    {vendors.map((contact) => {
                      return (
                        <option key={contact} value={`${contact.Name}`}>
                          {contact.Name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mt-6 mb-5 relative w-1/3">
                  <label className="block z-40 text-sm font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
                    Select Invoice
                  </label>
                  <Select
                    value={selectedMultiValue}
                    onChange={handleChangeMulti}
                    options={options}
                    isMulti
                    styles={{
                      height: "full",
                    }}
                  />
                </div>
                <div className="mt-6 mb-5 relative w-1/3">
                  <label className="block z-40 text-sm font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
                    Invoice Date From
                  </label>
                  <TextField
                    required
                    fullWidth
                    name="date"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => {
                      setDateFrom(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-10 justify-between">
                <div className="relative w-1/3">
                  <label className="block z-40 text-sm font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
                    Invoice Date to
                  </label>
                  <TextField
                    required
                    fullWidth
                    name="date"
                    type="date"
                    value={dateTo}
                    onChange={(e) => {
                      setDateTo(e.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setupTable();
                      setLineData([]);
                    }}
                    className="px-[20px] py-[8px] rounded-sm h-[40px] text-white bg-[#3f84e5]"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => {
                      setSelectedVendor("");
                      setDateFrom("");
                      setDateTo("");
                      setSelectedMultiValue([]);
                      setInvoiceDex([]);
                      settVendorName("");
                      settVendorNumber("");
                      setLineData([]);
                    }}
                    className="px-[20px] py-[8px] rounded-sm h-[40px] text-white bg-[#5D656A]"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* table starts from here */}

              {invoiceDex.length > 0 && (
                <>
                  <h3 className="text-2xl text-blue-500 mt-16 mb-4">
                    Invoices
                  </h3>
                  <hr />

                  <div className="overflow-x-auto mt-8 ">
                    <table className="table w-full">
                      <thead>
                        <th></th>
                        <th>Number</th>
                        <th>Date</th>
                        <th>Due Date</th>
                        <th>Vendor Name</th>
                        <th>Vendor Number</th>
                        <th>Invoice Amount</th>
                        <th>Amount Due</th>
                        <th>Currency</th>
                      </thead>
                      <tbody>
                        {invoiceDex.map((inv) => {
                          return (
                            <tr key={inv.InvoiceNumber} className="border-b-2">
                              <td>
                                <input
                                  type="checkbox"
                                  id={inv.InvoiceNumber}
                                  className="checkbox"
                                  onChange={handleLineData}
                                />
                              </td>
                              <td className="text-center">
                                {inv.InvoiceNumber}{" "}
                              </td>
                              <td className="text-center">
                                {formatDate(inv.Date)}
                              </td>
                              <td className="text-center">
                                {formatDate(inv.DueDate)}
                              </td>
                              <td className="text-center">{tVendorName}</td>
                              <td className="text-center">{tVendorNumber}</td>
                              <td className="text-center">{inv.Total}</td>
                              <td className="text-center">{inv.AmountDue}</td>
                              <td className="text-center">
                                {inv.CurrencyCode}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {lineData.length > 0 && (
                <>
                  <h3 className="text-2xl text-blue-500 mt-16 mb-4">
                    Invoice Lines
                  </h3>
                  <hr />

                  <div className="overflow-x-auto mt-8 ">
                    <table className="table w-full">
                      <thead>
                        <th>Number</th>
                        <th>Item</th>
                        <th>Item Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                      </thead>
                      <tbody>
                        {lineData.map((ln) => {
                          return (
                            <tr key={ln} className="border-b-2">
                              <td className="text-center">{ln.invID}</td>
                              <td className="text-center">{ln.it}</td>
                              <td className="text-center">{ln.desc}</td>
                              <td className="text-center">{ln.quan}</td>
                              <td className="text-center">{ln.uprice}</td>
                              <td className="text-center">{ln.amount}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
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
            <TrStep3 props={sendTo3} />
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
                {isLastStep && (
                  <button
                    onClick={handleButtonClick}
                    className="bg-[#AEB2B4] px-10 text-white py-2 rounded "
                  >
                    Submit
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
