import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ViewTransactionsDetails from "./ViewTransactionsDetails";
import SetupFHMDataFeeds from "./SetupFHMDataFeeds";
import FHMScheduling from "./FHMScheduling";
import ReviewFHMProcessDetails from "./ReviewFHMProcessDetails";

const FHMProcessManagement = () => {
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
            const response = await fetch("/public/Manage FHM Processes.json");
            if (!response.ok) {
                throw new Error("Could not fetch");
            }
            const data = await response.json();
            setAllApplications(data.aliveBanks.aliveERPCustBanks);
            setFilteredApplications(data.aliveBanks.aliveERPCustBanks[0].aliveERPCustBankServices[0].aliveCustFHMProcessRequests);
        } catch (error) {
            console.log("could not fetch Vendors", error);
        }
    };
    const [erpApplicationNames, setErpApplicationNames] = useState([]);
    const [countries, setCountries] = useState([]);
    const [requestStatuses, setRequestStatuses] = useState([]);

    const [selectedType, setSelectedType] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        if (allApplications) {
            if (allApplications.length > 0) {
                // Extract arrays from allApplications data with distinct values
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
                    ...new Set(allApplications.map((app) => app.aliveERPCustBankServices[0].serviceName)),
                ];
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
    const [viewCustomerDetails2, setViewCustomerDetails2] = useState(false);
    const [selectedCustomerBankRelID, setSelectedCustomerBankRelID] =
        useState(null);

    const handleView = (customerBankRelID) => {
        setSelectedCustomerBankRelID(customerBankRelID); // Set the selected customerBankRelID
        setViewCustomerDetails(true); // Toggle to show the CustomerDetails component
    };
    const handleSc = (customerBankRelID) => {
        setSelectedCustomerBankRelID(customerBankRelID); // Set the selected customerBankRelID
        setViewCustomerDetails2(true); // Toggle to show the CustomerDetails component
    };

    const handleReturnValue = (value) => {
        setViewCustomerDetails(value);
        setViewCustomerDetails2(value);
    };

    useEffect(() => {
        if (filteredApplications) {
            console.log("AAAAAasdsadsa", filteredApplications)
        }
    }, [filteredApplications])
    const [searchNumber, setSearchNumber] = useState(""); // New state for search by Number
    if (viewCustomerDetails) {
        // Render CustomerDetails component if viewCustomerDetails is true
        return (
            <ReviewFHMProcessDetails
                customerBankRelID={selectedCustomerBankRelID}
                onReturnValue={handleReturnValue}
            />
        );
    }
    if (viewCustomerDetails2) {
        // Render CustomerDetails component if viewCustomerDetails is true
        return (
            <FHMScheduling
                customerBankRelID={selectedCustomerBankRelID}
                onReturnValue={handleReturnValue}
            />
        );
    }

    // Handle search by transaction number
    const handleNumberSearch = (e) => {
        setSearchNumber(e.target.value);
        if (e.target.value === "") {
            setFilteredApplications(allApplications); // Reset if search field is empty
        } else {
            const filtered = allApplications.filter((app) =>
                app.aliveERPOrganizations.erpOrganizationname.includes(e.target.value)
            );
            setFilteredApplications(filtered);
        }
    };



    return (
        <div className="max-w-[1200px] mx-auto pt-10 rounded-lg h-[3000px]">
            <h1 className="font-medium text-3xl mb-2">Manage FHM Processes</h1>
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
                <div className="mt-6 mb-5 relative w-1/3">
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
            </div>

            <div className="flex gap-10 justify-start">
                <div className="mb-5 relative w-[31%]">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Application Date
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
                <div className="mb-5 relative w-[31%]">
                    {selectedStatus !== "" && (
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            FHM Data Service Name
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
                            FHM Data Service Name
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

            <h1 className="font-medium text-xl mb-2 mt-4">
                FHM Process Requests
            </h1>
            <hr />


            {/* Table */}
            <div className="overflow-x-auto mt-10">
                <table className="table w-full">
                    <thead>
                        <tr className="border-b-2 border-slate-200">
                            <th>Process ID</th>
                            <th>Customer Name</th>
                            <th>ERP Application</th>
                            <th>FHM Data Services</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Text</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplications?.map((bank) => (
                            <tr key={bank} className="border-b-2 border-slate-200">
                                <td className="py-2 text-center">
                                    {bank.fhmProcessRequestID}
                                </td>
                                <td className="py-2 text-center">
                                    {allApplications[0].aliveERPOrganizations.erpOrganizationname}
                                </td>
                                <td className="py-2 text-center">
                                    {
                                        allApplications[0].aliveERPOrganizations.aliveERPApplications
                                            .erpApplicationName
                                    }
                                </td>
                                <td className="py-2 text-center">
                                    {
                                        bank.aliveCustFHMDataServices.fhmDataserviceName
                                    }
                                </td>
                                <td className="text-center flex justify-center py-2">
                                    {bank.processStatus === "Success" && (
                                        <div className="bg-green-300 rounded-3xl px-4 py-1 text-green-900 w-fit text-sm">
                                            Success
                                        </div>
                                    )}
                                    {bank.processStatus === "Error" && (
                                        <div className="bg-red-300 rounded-3xl px-4 py-1 text-red-900 w-fit text-sm">
                                            Error
                                        </div>
                                    )}
                                    {bank.processStatus === "Scheduled" && (
                                        <div className="bg-blue-300 rounded-3xl px-4 py-1 text-blue-900 w-fit text-sm">
                                            Scheduled
                                        </div>
                                    )}
                                </td>
                                <td className="py-2 text-center">
                                    {formatDate(
                                        bank.processStartDate
                                    )}
                                </td>
                                <td className="py-2 text-center">
                                    {formatDate(
                                        bank.processEndDate
                                    )}
                                </td>
                                <td className="">
                                    <div className="flex justify-center">
                                        <button className="px-2 py-1 bg-slate-600 text-white rounded-sm" onClick={()=>handleView(allApplications[0].aliveERPCustBankServices[0].custBankServiceID)}>
                                            View
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FHMProcessManagement