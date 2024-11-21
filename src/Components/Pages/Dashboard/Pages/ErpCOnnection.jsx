import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ViewCustomerApplication from "./ViewCustomerApplication";
import ViewERPConnection from "./ViewERPConnection";

const ErpCOnnection = () => {
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
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [aliveERPCustBanks, setAliveERPCustBanks] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  const [allApplications, setAllApplications] = useState(null);
  const fetchCustomerApplications = async () => {
    try {
      const response = await fetch("/public/Manage ERP Connection.json");
      if (!response.ok) {
        throw new Error("Could not fetch");
      }
      const data = await response.json();
      setAllApplications(data.aliveERPConnections);
      setFilteredApplications(data.aliveERPConnections);
    } catch (error) {
      console.log("could not fetch Vendors", error);
    }
  };

  const [erpApplications, setErpApplications] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState([]);
  const [organization, setOrganization] = useState([]);
  useEffect(() => {
    if (allApplications) {
      console.log("aaaa",allApplications)
      // Extract and deduplicate erpApplicationName
      const uniqueErpApplicationNames = [
        ...new Set(
          allApplications.map(
            app => app.aliveERPConnections.aliveERPApplications.erpApplicationName
          )
        )
      ];

      // Extract and deduplicate erpOrganizationname
      const uniqueErpOrganizationNames = [
        ...new Set(
          allApplications.map(
            app => app.aliveERPConnections.erpOrganizationname
          )
        )
      ];

      // Extract and deduplicate connectionStatus
      const uniqueConnectionStatuses = [
        ...new Set(allApplications.map(app => app.connectionStatus))
      ];

      // Set the states with the unique values
      setErpApplications(uniqueErpApplicationNames);
      setOrganization(uniqueErpOrganizationNames);
      setConnectionStatus(uniqueConnectionStatuses);
    }
  }, [allApplications]);

  useEffect(() => {
    fetchCustomerApplications();
  }, []);



  const handleSearch = () => {
    if (!allApplications) return;
  
    // Filter based on selected criteria
    const filtered = allApplications.filter((app) => {
      const erpApplicationName = app.aliveERPConnections.aliveERPApplications.erpApplicationName;
      const organizationName = app.aliveERPConnections.erpOrganizationname;
      const status = app.connectionStatus;
  
      // Check each criterion, allowing all if the selection is empty
      const matchesErpApplication =
        selectedErpApplication === "" || erpApplicationName === selectedErpApplication;
      const matchesOrganization =
        selectedOrganization === "" || organizationName === selectedOrganization;
      const matchesStatus = selectedStatus === "" || status === selectedStatus;
  
      // Only include applications that match all selected criteria
      return matchesErpApplication && matchesOrganization && matchesStatus;
    });
  
    setFilteredApplications(filtered);
  };

  const handleClear = () => {
    setSelectedCustomerName("");
    setSelectedApplicationStatus("");
    setSelectedDate("");
    setSelectedErpApplication("");
    setSelectedOrganization("");
    setSelectedStatus("");
    setFilteredApplications(allApplications); // Reset to show all
  };

  const [viewCustomerDetails, setViewCustomerDetails] = useState(false);
  const handleReturnValue = (value) => {
    setViewCustomerDetails(value);
  };
  const [selectedCustomerBankRelID, setSelectedCustomerBankRelID] = useState(null);

  const handleView = (customerBankRelID) => {
    setSelectedCustomerBankRelID(customerBankRelID);  // Set the selected customerBankRelID
    setViewCustomerDetails(true); // Toggle to show the CustomerDetails component
  };

  const [searchNumber, setSearchNumber] = useState(""); 

  const handleNumberSearch = (e) => {
    setSearchNumber(e.target.value);
    if (e.target.value === "") {
      setFilteredApplications(allApplications); // Reset if search field is empty
    } else {
      const filtered = filteredApplications.filter((app) =>
        app.aliveERPConnections.erpClientID===e.target.value
      );
      setFilteredApplications(filtered);
    }
  };

  if (viewCustomerDetails) {
    // Render CustomerDetails component if viewCustomerDetails is true
    return <ViewERPConnection customerBankRelID={selectedCustomerBankRelID} onReturnValue={handleReturnValue} />;
  }


  return (
    <div className="max-w-[1200px] mx-auto pt-10 rounded-lg ">
      <h1 className="font-medium text-3xl mb-2">Manage ERP Connection</h1>
      <hr />

      {/* Search fields */}
      <div className="flex gap-10 justify-around">
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
        <div className="mt-6 mb-5 relative w-1/3">
          {selectedStatus !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              Connection Status
            </label>
          )}
          <select
            id="erpSelect"
            name="erpSelect"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option disabled value="">
              Connection Status
            </option>
            {connectionStatus.map((erp) => (
              <option key={erp} value={erp}>
                {erp}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6 mb-5 relative w-1/3">
          {selectedOrganization !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              Organization/Entity
            </label>
          )}
          <select
            id="erpSelect"
            name="erpSelect"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={selectedOrganization}
            onChange={(e) => setSelectedOrganization(e.target.value)}
          >
            <option disabled value="">
              Organization/Entity
            </option>
            {organization.map((erp) => (
              <option key={erp} value={erp}>
                {erp}
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


      <h1 className="font-medium text-xl mb-2">User List</h1>
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
      <div className="overflow-x-auto mt-20">
        <table className="table w-full">
          <thead>
            <tr className="border-b-[1px] border-b-slate-400">
              <th>ERP Application</th>
              <th>Organization Name</th>
              <th>Connection Status</th>
              <th>ERP Client ID</th>
              <th>Start Date</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications?.map((bank) => (
              <tr key={bank} className="border-b-[1px] border-b-slate-400">
                <td className="py-2 text-center">{bank.aliveERPConnections.aliveERPApplications.erpApplicationName}</td>
                <td className="py-2 text-center">
                  {bank.aliveERPConnections.erpOrganizationname}
                </td>
                <td className="text-center flex justify-center py-2">
                  {bank.connectionStatus === "Active" && (
                    <div className="bg-green-700 rounded-3xl px-4 py-1 text-white w-fit text-sm">
                      Active
                    </div>
                  )}
                  {bank.connectionStatus === "In Progress" && (
                    <div className="bg-orange-600 rounded-3xl px-4 py-1 text-white w-fit text-sm">
                      In Progress
                    </div>
                  )}
                  {bank.connectionStatus === "Inactive" && (
                    <div className="bg-blue-700 rounded-3xl px-4 py-1 text-white w-fit text-sm">
                      Inactive
                    </div>
                  )}
                </td>
                <td className="py-2 text-center">{bank.aliveERPConnections.erpClientID}</td>
                <td className="py-2 text-center">{formatDate(bank.aliveERPConnections.startDate)}</td>
                <td className="py-2 text-center">{formatDate(bank.aliveERPConnections.endDate)}</td>
                <td className="flex justify-center">
                  <button onClick={() => handleView(bank.erpConnectionID)} className="border border-slate-500 p-1">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ErpCOnnection