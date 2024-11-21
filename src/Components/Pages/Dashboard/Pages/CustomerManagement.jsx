import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ViewCustomerApplication from "./ViewCustomerApplication";

const CustomerManagement = () => {
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
  const [activeStep, setActiveStep] = useState(1);

  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedApplicationStatus, setSelectedApplicationStatus] =
    useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedErpApplication, setSelectedErpApplication] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedServices, setSelectedServices] = useState("");
  const servicesOptions = ["Bill Payment"];

  const [allApplications, setAllApplications] = useState(null);
  const [erpApplications, setErpApplications] = useState([]);
  const [countries, setCountries] = useState([]);
  const [aliveERPCustBanks, setAliveERPCustBanks] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  const fetchCustomerApplications = async () => {
    try {
      const response = await fetch("/Customer Application.json");
      if (!response.ok) {
        throw new Error("Could not fetch");
      }
      const data = await response.json();
      setAllApplications(data.aliveBanks);
    } catch (error) {
      console.log("could not fetch Vendors", error);
    }
  };

  useEffect(() => {
    if (allApplications) {
      const erpApplicationNames = allApplications.flatMap((bank) =>
        bank.aliveERPCustBanks.flatMap((custBank) =>
          custBank.aliveERPApplications.map((app) => app.erpApplicationName)
        )
      );
      setErpApplications(erpApplicationNames);

      const countrySet = new Set();
      allApplications.forEach((bank) => {
        bank.aliveERPCustBanks.forEach((custBank) => {
          custBank.aliveERPOrganizations.forEach((org) => {
            org.aliveERPAddresses.forEach((address) => {
              countrySet.add(address.country);
            });
          });
        });
      });
      setCountries([...countrySet]);

      const custBanksArray = allApplications.flatMap(
        (bank) => bank.aliveERPCustBanks
      );
      setAliveERPCustBanks(custBanksArray);
      setFilteredApplications(custBanksArray); // Default to show all initially
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
    const filtered = aliveERPCustBanks.filter((bank) => {
      const customerNameMatch = selectedCustomerName
        ? bank.aliveERPOrganizations[0].erpOrganizationName
            .toLowerCase()
            .includes(selectedCustomerName.toLowerCase())
        : true;
      const applicationStatusMatch = selectedApplicationStatus
        ? bank.applicationStatus === selectedApplicationStatus
        : true;
      const dateMatch = selectedDate
        ? bank.creationDate.startsWith(selectedDate)
        : true;
      const erpApplicationMatch = selectedErpApplication
        ? bank.aliveERPApplications[0].erpApplicationName ===
          selectedErpApplication
        : true;
      const countryMatch = selectedCountry
        ? bank.aliveERPOrganizations[0].aliveERPAddresses[0].country ===
          selectedCountry
        : true;
      const servicesMatch = selectedServices
        ? bank.servicesRequested.includes(selectedServices)
        : true;

      return (
        customerNameMatch &&
        applicationStatusMatch &&
        dateMatch &&
        erpApplicationMatch &&
        countryMatch &&
        servicesMatch
      );
    });

    setFilteredApplications(filtered);
  };

  const handleClear = () => {
    setSelectedCustomerName("");
    setSelectedApplicationStatus("");
    setSelectedDate("");
    setSelectedErpApplication("");
    setSelectedCountry("");
    setSelectedServices("");
    setFilteredApplications(aliveERPCustBanks); // Reset to show all
  };

  const [viewCustomerDetails, setViewCustomerDetails] = useState(false);
  const [selectedCustomerBankRelID, setSelectedCustomerBankRelID] = useState(null);

  const handleView = (customerBankRelID) => {
    setSelectedCustomerBankRelID(customerBankRelID);  // Set the selected customerBankRelID
    setViewCustomerDetails(true); // Toggle to show the CustomerDetails component
  };

  if (viewCustomerDetails) {
    // Render CustomerDetails component if viewCustomerDetails is true
    return <ViewCustomerApplication customerBankRelID={selectedCustomerBankRelID} />;
  }


  return (
    <div className="max-w-[1200px] mx-auto pt-10 rounded-lg ">
      <h1 className="font-medium text-3xl mb-2">Manage Customers</h1>
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
          {selectedApplicationStatus !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              Application Status
            </label>
          )}
          <input
            id="applicationStatus"
            name="applicationStatus"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={selectedApplicationStatus}
            onChange={(e) => setSelectedApplicationStatus(e.target.value)}
            placeholder="Application Status"
          />
        </div>
        <div className="mt-6 mb-5 relative w-1/3">
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
            {erpApplications.map((erp) => (
              <option key={erp} value={erp}>
                {erp}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-10 justify-between">
        

        <div className="mb-5 relative w-[31%]">
          {selectedServices !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              Services Requested
            </label>
          )}
          <select
            id="servicesSelect"
            name="servicesSelect"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={selectedServices}
            onChange={(e) => setSelectedServices(e.target.value)}
          >
            <option disabled value="">
              Services Requested
            </option>
            {servicesOptions.map((service) => (
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

      {/* Table */}
      <div className="overflow-x-auto mt-20">
        <table className="table w-full">
          <thead>
            <tr  className="border-b-[1px] border-b-slate-400">
              <th>Customer Name</th>
              <th>Country</th>
              <th>ERP Application</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((bank) => (
              <tr key={bank.creationDate}  className="border-b-[1px] border-b-slate-400">
                <td className="py-2 text-center">{bank.aliveERPOrganizations[0].erpOrganizationName}</td>
                <td className="py-2 text-center">
                  {bank.aliveERPOrganizations[0].aliveERPAddresses[0].country}
                </td>

                <td className="py-2 text-center">{bank.aliveERPApplications[0].erpApplicationName}</td>
                <td className="flex justify-center">
                  <button  className="border border-slate-500 p-1">Services</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerManagement