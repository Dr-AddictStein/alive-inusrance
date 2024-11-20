import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const ViewTransactionsDetails = ({ customerBankRelID,onReturnValue  }) => {
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
            const response = await fetch("/View Transactions Details.json");
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
                (bank) => bank.customerBankProfileID === customerBankRelID
            );

            console.log("HERER aa", customer)
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

    const [toggleState, setToggleState] = useState(false); // Step 1: Add toggle state

    const handleToggle = () => {
        setToggleState((prev) => !prev); // Step 2: Toggle the state
    };

    const [isPayment, setIsPayment] = useState(false);
    const [isSecretVisible, setIsSecretVisible] = useState(false);

    const toggleSecretVisibility = () => {
        setIsSecretVisible(!isSecretVisible);
    };





    return (
        <>
            <div className="max-w-[1200px] mx-auto pt-10 rounded-lg h-[3000px]">
                <div className="flex gap-6">
                    <div className="">
                    <button onClick={sendValueBack} className="text-4xl"><MdOutlineKeyboardBackspace /></button>

                    </div>
                    <h1 className="font-medium text-3xl mb-4">View Transaction Details</h1>
                </div>
                <h1 className="font-medium text-xl mb-1 mt-10">Customer Details</h1>
                <hr />

                <div className="flex gap-10 justify-around">
                    <div className="mt-6 mb-5 relative w-1/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Customer Name
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveERPOrganizations.erpOrganizationName}
                            disabled
                            placeholder="Customer Name"
                        />
                    </div>
                    <div className="mt-6 mb-5 relative w-1/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Customer Country
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveERPOrganizations.aliveAddresses.country}
                            disabled
                            placeholder="Customer Country"
                        />
                    </div>
                    <div className="mt-6  mb-5 relative w-1/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            ERP Application
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveERPOrganizations.aliveERPApplications.erpApplicationName}
                            disabled
                        />
                    </div>
                </div>
                <div className="flex gap-10 justify-start">
                    <div className="mb-5 relative w-[31%]">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Client ID
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveERPOrganizations.aliveERPCustBankAuth.clientID}
                            disabled
                            placeholder="Customer Name"
                        />
                    </div>
                    <div className="mb-5 relative w-[31%]">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Client ID
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveERPOrganizations.aliveERPCustBankAuth.clientProfileID}
                            disabled
                            placeholder="Customer Name"
                        />
                    </div>
                </div>
                <h1 className="font-medium text-xl mb-1">Transaction Details</h1>
                <hr />
                <div className="flex gap-10 justify-around">
                    <div className="mt-6 mb-5 relative w-1/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Transaction Number
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveBillPaymentRequests.billPaymentRequestID}
                            disabled
                            placeholder="Customer Name"
                        />
                    </div>
                    <div className="mt-6 mb-5 relative w-1/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Date
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={formatDate(user?.aliveBillPaymentRequests.paymentRequestDate)}
                            disabled
                            placeholder="Customer Country"
                        />
                    </div>
                    <div className="mt-6  mb-5 relative w-1/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Type
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveERPOrganizations.aliveCustBankServices.aliveBankServices.serviceName}
                            disabled
                        />
                    </div>
                </div>
                <div className="flex gap-10 justify-around">
                    <div className="mb-5 relative w-1/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Transaction Currency
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveBillPaymentRequests.transactionCurrency}
                            disabled
                            placeholder="Customer Name"
                        />
                    </div>
                    <div className="mb-5 relative w-1/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Service
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveERPOrganizations.aliveCustBankServices.serviceName}
                            disabled
                            placeholder="Customer Country"
                        />
                    </div>
                    <div className="mb-5 relative w-1/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Sub-Type
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveERPOrganizations.aliveCustBankServices.aliveBankServices.serviceSubType}
                            disabled
                        />
                    </div>
                </div>
                <div className="flex gap-10 justify-around">
                    <div className="mb-5 relative w-[32%]">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Status
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveBillPaymentRequests.requestStatus}
                            disabled
                            placeholder="Customer Name"
                        />
                    </div>
                    <div className="mb-5 relative w-2/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Notes from customer
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value="Bill payment request for domestic vendor"
                            disabled
                            placeholder="Customer Country"
                        />
                    </div>
                </div>
                <div className="flex gap-10 justify-around">
                    <div className="mb-5 relative w-full">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Processing Errors (From Bacnk APIs)
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value="----"
                            disabled
                            placeholder="Customer Name"
                        />
                    </div>
                </div>

            </div>
        </>
    );
};

export default ViewTransactionsDetails