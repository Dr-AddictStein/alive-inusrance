import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { TextField } from "@mui/material";

const TrStep2 = () => {
  const [vendors, setVendors] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [defaultInvoices, setDefaultInvoices] = useState([]);

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
  }, []);

  const buildDefaultInvoices = () => {
    let tempDef = [];
    for (let i = 0; i < invoices.length; i++) {
      let vNum;
      for (let j = 0; j < vendors.length; j++) {
        if (vendors[j].Name === invoices[i].Contact.Name) {
          vNum = vendors[j].AccountNumber;
          break;
        }
      }
      let tempOb = {
        Number: invoices[i].InvoiceNumber,
        Date: invoices[i].Date,
        DueDate: invoices[i].DueDate,
        VendorName: invoices[i].Contact.Name,
        VendorNumber: vNum,
        InvoiceAmount: invoices[i].Total,
        InvoiceDue: invoices[i].AmountDue,
        Currency: invoices[i].CurrencyCode,
      };

      tempDef.push(tempOb);
    }

    setDefaultInvoices(tempDef);
  };
  useEffect(() => {
    buildDefaultInvoices();
  }, [invoices]);

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
          dex.push(invoices[j]);
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
    <div className="mx-auto mt-20">
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

      <h3 className="text-2xl text-blue-500 mt-16 mb-4">Invoices</h3>
      <hr />

      <div className="overflow-x-auto mt-8 text-[#1D6FFF]">
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
            <th>Action</th>
          </thead>
          <tbody>
            {invoiceDex.length === 0 ? (
              <>
                {defaultInvoices.map((inv) => {
                  return (
                    <tr key={inv.Number} className="border-b-2">
                      <td>
                        <input
                          type="checkbox"
                          id={inv.Number}
                          className="checkbox"
                          onChange={handleLineData}
                        />
                      </td>
                      <td className="text-center">{inv.Number} </td>
                      <td className="text-center">{formatDate(inv.Date)}</td>
                      <td className="text-center">{formatDate(inv.DueDate)}</td>
                      <td className="text-center">{inv.VendorName}</td>
                      <td className="text-center">{inv.VendorNumber}</td>
                      <td className="text-center">{inv.InvoiceAmount}</td>
                      <td className="text-center">{inv.InvoiceDue}</td>
                      <td className="text-center">{inv.CurrencyCode}</td>
                      <td>
                        <button className="h-[28px] py-[4px] px-[6px] border-2 border-blue-500">
                          Pay
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
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
                      <td className="text-center">{inv.InvoiceNumber} </td>
                      <td className="text-center">{formatDate(inv.Date)}</td>
                      <td className="text-center">{formatDate(inv.DueDate)}</td>
                      <td className="text-center">{tVendorName}</td>
                      <td className="text-center">{tVendorNumber}</td>
                      <td className="text-center">{inv.Total}</td>
                      <td className="text-center">{inv.AmountDue}</td>
                      <td className="text-center">{inv.CurrencyCode}</td>
                      <td>
                        <button className="h-[28px] py-[4px] px-[6px] border-2 border-blue-500">
                          Pay
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>

      <h3 className="text-2xl text-blue-500 mt-16 mb-4">Invoice Lines</h3>
      <hr />

      <div className="overflow-x-auto mt-8 text-[#1D6FFF]">
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
    </div>
  );
};

export default TrStep2;
