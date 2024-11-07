import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CustomerServiceManagement from "./CustomerServiceManagement";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const ViewCustomerApplication = ({ customerBankRelID ,onReturnValue}) => {
    const sendValueBack = () => {
        const value = false;
        onReturnValue(value); // Send value back to Component A
    };
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

    const [selectedCountry, setSelectedCountry] = useState("");


    const [allApplications, setAllApplications] = useState(null);


    const [user, setUser] = useState(null);

    const fetchCustomerApplications = async () => {
        try {
            const response = await fetch("/View Customer Application.json");
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
            const { aliveERPCustBanks } = allApplications;

            // Use the find method to search for the customer with the matching customerBankRelID
            const customer = aliveERPCustBanks.find(
                (bank) => bank.customerBankRelID === customerBankRelID
            );
            setUser(customer);


        }
    }, [allApplications]);

    const [serviceList, setServiceList] = useState([]);

    useEffect(() => {
        if (user) {
            console.log("user", user);
            setSelectedCustomerName(user.aliveERPOrganizations.erpOrganizationname);
            setSelectedCountry(user.aliveERPOrganizations.aliveAddresses.country);
            setSelectedDate(user.creationDate);
            setServiceList(user.aliveERPOrganizations.aliveERPCustBankServices);
        }
    }, [user]);

    useEffect(() => {
        if (selectedCustomerName) {
            console.log(":LOG", selectedCustomerName)
        }
    }, [selectedCustomerName])

    useEffect(() => {
        fetchCustomerApplications();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const filteredServiceList = serviceList.filter((serv) =>
        serv.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [viewCustomerDetails, setViewCustomerDetails] = useState(false);
  const [selectedCustomerBankRelID, setSelectedCustomerBankRelID] = useState(null);

  const handleView = (customerBankRelID) => {
    setSelectedCustomerBankRelID(customerBankRelID);  // Set the selected customerBankRelID
    setViewCustomerDetails(true); // Toggle to show the CustomerDetails component
  };
  const handleReturnValue = (value) => {
    setViewCustomerDetails(value);
  };

  if (viewCustomerDetails) {
    // Render CustomerDetails component if viewCustomerDetails is true
    return <CustomerServiceManagement customerBankRelID={selectedCustomerBankRelID} onReturnValue={handleReturnValue}/>;
  }




    return (
        <div className="max-w-[1200px] mx-auto pt-10 rounded-lg h-[3000px]">
            <div className="flex gap-6">
                <div className="">
                    <button onClick={sendValueBack} className="text-4xl">
                        <MdOutlineKeyboardBackspace />
                    </button>
                </div>
                <h1 className="font-medium text-3xl mb-4">View Customer Application</h1>
            </div>
            <h1 className="font-medium text-xl mb-1">General</h1>
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
                        disabled
                        placeholder="Customer Name"
                    />
                </div>
                <div className="mt-6 mb-5 relative w-1/3">
                    {selectedCountry !== "" && (
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Customer Country
                        </label>
                    )}
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={selectedCountry}
                        disabled
                        placeholder="Customer Country"
                    />
                </div>
                <div className="mt-6 mb-5 relative w-1/3">
                    {selectedDate !== "" && (
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Application Date
                        </label>
                    )}
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={formatDate(selectedDate)}
                        disabled
                        placeholder="Application Date"
                    />
                </div>
            </div>
            <div className="flex gap-10 justify-around">
                <div className="mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Customer Contact Email
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveERPOrgContacts[0].emailID}
                        disabled
                    />
                </div>
                <div className="mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Customer Contact Number
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveERPOrgContacts[0].phone}
                        disabled
                    />
                </div>
                <div className="mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        ERP Application
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveERPOrganizations.aliveERPApplications[0].erpApplicationName}
                        disabled
                    />
                </div>
            </div>

            <div className="flex gap-10 justify-around">
                <div className="mb-5 relative w-full">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Comments
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={"Bill payments request, we already have accounts with your bank and would like to request for additional services."}
                        disabled
                    />
                </div>
            </div>



            <h1 className="font-medium text-xl mb-1">Services</h1>
            <hr />
            <div className="mb-5 w-1/3">
                <input
                    type="text"
                    placeholder="Search by Service Name"
                    className="mt-2 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-20">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Country</th>
                            <th>Request Status</th>
                            <th>Start Date</th>
                            <th>Due Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServiceList.map((serv) => (
                            <tr key={serv}>
                                <td className="py-2 text-center">{serv.serviceName}</td>
                                <td className="py-2 text-center">{serv.serviceCountry}</td>
                                <td className="text-center flex justify-center py-2">
                                    {serv.serviceStatus === "Submitted" && (
                                        <div className="bg-blue-500 rounded-3xl px-4 py-1 text-white w-fit text-sm">
                                            Submitted
                                        </div>
                                    )}
                                    {serv.serviceStatus === "In Progress" && (
                                        <div className="bg-orange-600 rounded-3xl px-4 py-1 text-white w-fit text-sm">
                                            In Progress
                                        </div>
                                    )}
                                    {serv.serviceStatus === "Approved" && (
                                        <div className="bg-green-700 rounded-3xl px-4 py-1 text-white w-fit text-sm">
                                            Approved
                                        </div>
                                    )}
                                </td>
                                <td className="py-2 text-center">{formatDate(serv.startDate)}</td>
                                <td className="py-2 text-center">{formatDate(serv.endDate)}</td>
                                <td className="flex justify-center gap-2 ">
                                    <button className="bg-blue-500 text-white p-1 rounded-sm">Review</button>
                                    <button onClick={()=>handleView(customerBankRelID)} className="bg-green-600 text-white p-1 rounded-sm">Accept</button>
                                    <button className="bg-red-500 text-white p-1 rounded-sm">Reject</button>
                                    <button className="bg-orange-500 text-white p-1 rounded-sm">Hold</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewCustomerApplication;
