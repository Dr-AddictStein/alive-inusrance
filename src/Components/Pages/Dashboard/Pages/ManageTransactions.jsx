import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ViewCustomerApplication from "./ViewCustomerApplication";
import ViewTransactionsDetails from "./ViewTransactionsDetails";
import HoldTransactions from "./HoldTransactions";
import CancelTransactions from "./CancelTransactions";

const ManageTransactions = () => {
  function formatDate(dateString) {
    const date = new Date(dateString); // Use the date string from JSON directly
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
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const navigate = useNavigate();

  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedErpApplication, setSelectedErpApplication] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredApplications, setFilteredApplications] = useState([]);

  const [allApplications, setAllApplications] = useState(null);
  const [aliveERPCustBanks, setAliveERPCustBanks] = useState([]);

  const fetchCustomerApplications = async () => {
    try {
      const response = await fetch("/Review Transactions.json");
      if (!response.ok) {
        throw new Error("Could not fetch");
      }
      const data = await response.json();
      setAllApplications(data.aliveBanks.aliveERPCustBanks);
      setFilteredApplications(data.aliveBanks.aliveERPCustBanks);
    } catch (error) {
      console.log("could not fetch Vendors", error);
    }
  };
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [erpApplicationNames, setErpApplicationNames] = useState([]);
  const [countries, setCountries] = useState([]);
  const [requestStatuses, setRequestStatuses] = useState([]);

  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (allApplications) {
      if (allApplications.length > 0) {
        // Extract arrays from allApplications data with distinct values
        const transactionTypesArray = [
          ...new Set(
            allApplications.map(
              (app) =>
                app.aliveERPOrganizations.aliveBillPaymentRequests
                  .transactionType
            )
          ),
        ];
        const erpApplicationNamesArray = [
          ...new Set(
            allApplications.map(
              (app) =>
                app.aliveERPOrganizations.aliveERPApplications
                  .erpApplicationName
            )
          ),
        ];
        const countriesArray = [
          ...new Set(
            allApplications.map(
              (app) => app.aliveERPOrganizations.aliveAddresses.country
            )
          ),
        ];
        const requestStatusesArray = [
          ...new Set(
            allApplications.map(
              (app) =>
                app.aliveERPOrganizations.aliveBillPaymentRequests.requestStatus
            )
          ),
        ];

        setTransactionTypes(transactionTypesArray);
        setErpApplicationNames(erpApplicationNamesArray);
        setCountries(countriesArray);
        setRequestStatuses(requestStatusesArray);
      }
    }
  }, [allApplications]);

  useEffect(() => {
    fetchCustomerApplications();
  }, []);

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD for comparison
    setSelectedDate(formattedDate);
  };

  const handleSearch = () => {
    const filtered = allApplications.filter((app) => {
      const matchesCustomerName = selectedCustomerName
        ? app.aliveERPOrganizations.erpOrganizationName
          .toLowerCase()
          .includes(selectedCustomerName.toLowerCase())
        : true;
      const matchesType = selectedType
        ? app.aliveERPOrganizations.aliveBillPaymentRequests.transactionType ===
        selectedType
        : true;
      const matchesErpApplication = selectedErpApplication
        ? app.aliveERPOrganizations.aliveERPApplications.erpApplicationName ===
        selectedErpApplication
        : true;
      const matchesCountry = selectedCountry
        ? app.aliveERPOrganizations.aliveAddresses.country === selectedCountry
        : true;
      const matchesStatus = selectedStatus
        ? app.aliveERPOrganizations.aliveBillPaymentRequests.requestStatus ===
        selectedStatus
        : true;
      const matchesDate = selectedDate
        ? new Date(
          app.aliveERPOrganizations.aliveBillPaymentRequests.paymentRequestDate
        )
          .toISOString()
          .split("T")[0] === selectedDate
        : true;

      return (
        matchesCustomerName &&
        matchesType &&
        matchesErpApplication &&
        matchesCountry &&
        matchesStatus &&
        matchesDate
      );
    });
    setFilteredApplications(filtered);
  };

  const handleClear = () => {
    setSelectedCustomerName("");
    setSelectedType("");
    setSelectedErpApplication("");
    setSelectedCountry("");
    setSelectedStatus("");
    setSelectedDate("");
    setFilteredApplications(allApplications);
  };

  const [viewCustomerDetails, setViewCustomerDetails] = useState(false);
  const [viewCustomerDetailsCancel, setViewCustomerDetailsCancel] = useState(false);
  const [selectedCustomerBank, setSelectedCustomerBank] =
    useState(null);

  const handleView = (bank) => {
    setSelectedCustomerBank(bank); // Set the selected customerBankRelID
    setViewCustomerDetails(true); // Toggle to show the CustomerDetails component
  };
  const handleViewCancel = (bank) => {
    setSelectedCustomerBank(bank); // Set the selected customerBankRelID
    setViewCustomerDetailsCancel(true); // Toggle to show the CustomerDetails component
  };

  const handleReturnValue = (value) => {
    setViewCustomerDetails(value);
  };
  const handleReturnValueCancel = (value) => {
    setViewCustomerDetailsCancel(value);
  };

  const [searchNumber, setSearchNumber] = useState(""); // New state for search by Number
  if (viewCustomerDetails) {
    // Render CustomerDetails component if viewCustomerDetails is true
    return (
      <HoldTransactions bank={selectedCustomerBank} onReturnValue={handleReturnValue} />
    );
  }
  if (viewCustomerDetailsCancel) {
    // Render CustomerDetails component if viewCustomerDetails is true
    return (
      <CancelTransactions bank={selectedCustomerBank} onReturnValue={handleReturnValueCancel} />
    );
  }

  // Handle search by transaction number
  const handleNumberSearch = (e) => {
    setSearchNumber(e.target.value);
    if (e.target.value === "") {
      setFilteredApplications(allApplications); // Reset if search field is empty
    } else {
      const filtered = allApplications.filter((app) =>
        app.aliveERPOrganizations.aliveBillPaymentRequests.billPaymentRequestID
          .toString()
          .includes(e.target.value)
      );
      setFilteredApplications(filtered);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto pt-10 rounded-lg h-[3000px]">
      <h1 className="font-medium text-3xl mb-2">Manage Transactions</h1>
      <hr />

      {/* Search fields */}
      <div className="flex gap-10 justify-around">
        <div className="mt-6 mb-5 relative w-1/3">
          {selectedCustomerName !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              Customer Name
            </label>
          )}
          <input
            id="customerName"
            name="customerName"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={selectedCustomerName}
            onChange={(e) => setSelectedCustomerName(e.target.value)}
            placeholder="Customer Name"
          />
        </div>
        <div className="mt-6 mb-5 relative w-1/3">
          {selectedType !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              Type
            </label>
          )}
          <select
            id="erpSelect"
            name="erpSelect"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option disabled value="">
              Type
            </option>
            {transactionTypes.map((erp) => (
              <option key={erp} value={erp}>
                {erp}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6 mb-5 relative w-1/3">
          <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            onChange={handleDateChange}
            placeholder="Select Date"
          />
        </div>
      </div>

      <div className="flex gap-10 justify-around">
        <div className="mb-5 relative w-1/3">
          {selectedErpApplication !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              ERP Application
            </label>
          )}
          <select
            id="erpSelect"
            name="erpSelect"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={selectedErpApplication}
            onChange={(e) => setSelectedErpApplication(e.target.value)}
          >
            <option disabled value="">
              ERP Application
            </option>
            {erpApplicationNames.map((erp) => (
              <option key={erp} value={erp}>
                {erp}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5 relative w-1/3">
          {selectedCountry !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              Customer Country
            </label>
          )}
          <select
            id="countrySelect"
            name="countrySelect"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option disabled value="">
              Customer Country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5 relative w-1/3">
          {selectedStatus !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              Transaction Status
            </label>
          )}
          <select
            id="servicesSelect"
            name="servicesSelect"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option disabled value="">
              Transaction Status
            </option>
            {requestStatuses.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-sm"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-slate-500 text-white px-4 py-2 rounded-sm"
        >
          Clear
        </button>
      </div>


      <h1 className="font-medium text-xl mb-2 mt-4">Customer Transactions</h1>
      <hr />
      <div className="mt-6 w-1/4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Search  "
          value={searchNumber}
          onChange={handleNumberSearch}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Number</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Currency</th>
              <th>Customer Name</th>
              <th>ERP Application</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications?.map((bank) => (
              <tr key={bank}>
                <td className="py-2 text-center">
                  {
                    bank.aliveERPOrganizations.aliveBillPaymentRequests
                      .billPaymentRequestID
                  }
                </td>
                <td className="py-2 text-center">
                  {
                    bank.aliveERPOrganizations.aliveBillPaymentRequests
                      .transactionType
                  }
                </td>
                <td className="py-2 text-center">
                  {formatDate(
                    bank.aliveERPOrganizations.aliveBillPaymentRequests
                      .paymentRequestDate
                  )}
                </td>
                <td className="text-center flex justify-center py-2">
                  {bank.aliveERPOrganizations.aliveBillPaymentRequests
                    .requestStatus === "Submitted" && (
                      <div className="bg-blue-500 rounded-3xl px-4 py-1 text-white w-fit text-sm">
                        Submitted
                      </div>
                    )}
                  {bank.aliveERPOrganizations.aliveBillPaymentRequests
                    .requestStatus === "In Progress" && (
                      <div className="bg-orange-600 rounded-3xl px-4 py-1 text-white w-fit text-sm">
                        In Progress
                      </div>
                    )}
                  {bank.aliveERPOrganizations.aliveBillPaymentRequests
                    .requestStatus === "Approved" && (
                      <div className="bg-green-700 rounded-3xl px-4 py-1 text-white w-fit text-sm">
                        Approved
                      </div>
                    )}
                </td>
                <td className="py-2 text-center">
                  {
                    bank.aliveERPOrganizations.aliveBillPaymentRequests
                      .transactionCurrency
                  }
                </td>
                <td className="py-2 text-center">
                  {bank.aliveERPOrganizations.erpOrganizationName}
                </td>
                <td className="py-2 text-center">
                  {
                    bank.aliveERPOrganizations.aliveERPApplications
                      .erpApplicationName
                  }
                </td>
                <td className="flex justify-center gap-3">
                  <button onClick={() => handleView(bank)} className="border border-slate-500 p-1 text-white bg-orange-600">Hold</button>
                  <button onClick={() => handleViewCancel(bank)} className="border border-slate-500 p-1 text-white bg-red-600">Reject</button>
                  <button onClick={() => handleView(bank)} className="border border-slate-500 p-1 text-white bg-blue-500">Re-Process</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTransactions