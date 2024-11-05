import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ToggleButton from 'react-toggle-button';
import { Switch } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const CustomerServiceManagement = ({ customerBankRelID }) => {
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
            const response = await fetch("/Customer Service Management.json");
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
        <div className="max-w-[1200px] mx-auto pt-10 rounded-lg h-[3000px]">
            <h1 className="font-medium text-3xl mb-4">View Customer Application</h1>
            <h1 className="font-medium text-xl mb-1">General</h1>
            <hr />

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
            <div className="flex gap-3">
                <h1 className="font-medium text-xl">Payments</h1>
                <div className="">
                    <Switch />
                </div>
            </div>
            <hr />
            <div className="flex gap-10 justify-around">
                <div className="mt-6 mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Client ID
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveCustBankPayments.aliveERPCustBankAuth.clientID}
                        disabled
                        placeholder="Customer Name"
                    />
                </div>
                <div className="mt-6 mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Client Secret
                    </label>
                    <input
                        type={isSecretVisible ? "text" : "password"}
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveCustBankPayments.aliveERPCustBankAuth.clientSecret}
                        disabled
                        placeholder="Customer Name"
                    />
                    <button
                        type="button"
                        onClick={toggleSecretVisibility}
                        className="absolute right-3 top-4"
                        aria-label={isSecretVisible ? "Hide password" : "Show password"}
                    >
                        {isSecretVisible ? (
                            <EyeOutlined className="h-5 w-5 text-gray-500" />
                        ) : (
                            <EyeInvisibleOutlined className="h-5 w-5 text-gray-500" />
                        )}
                    </button>
                </div>
                <div className="mt-6 mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Client ID/Client Profile ID
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveCustBankPayments.aliveERPCustBankAuth.clientProfileID}
                        disabled
                        placeholder="Customer Name"
                    />
                </div>
            </div>
            <div className="flex gap-10 justify-between">
                <div className="mb-5 relative w-[31%]">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Notes to Customer
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveCustBankPayments.notesFromBank}
                        disabled
                        placeholder="Customer Name"
                    />
                </div>

            </div>
            <div className="flex gap-3">
                <h1 className="font-medium text-xl">Trade Loans</h1>
                <div className="">
                    <Switch />
                </div>
            </div>
            <hr />
            <div className="flex gap-10 justify-around">
                <div className="mt-6 mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Client ID
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveCustBankTradeLoans.aliveERPCustBankAuth.clientID}
                        disabled
                        placeholder="Customer Name"
                    />
                </div>
                <div className="mt-6 mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Client Secret
                    </label>
                    <input
                        type={isSecretVisible ? "text" : "password"}
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveCustBankTradeLoans.aliveERPCustBankAuth.clientSecret}
                        disabled
                        placeholder="Customer Name"
                    />
                    <button
                        type="button"
                        onClick={toggleSecretVisibility}
                        className="absolute right-3 top-4"
                        aria-label={isSecretVisible ? "Hide password" : "Show password"}
                    >
                        {isSecretVisible ? (
                            <EyeOutlined className="h-5 w-5 text-gray-500" />
                        ) : (
                            <EyeInvisibleOutlined className="h-5 w-5 text-gray-500" />
                        )}
                    </button>
                </div>
                <div className="mt-6 mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Notes to Customer
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveCustBankTradeLoans.notesFromBank}
                        disabled
                        placeholder="Customer Name"
                    />
                </div>
            </div>
            <div className="flex gap-10 justify-around">
                <div className="mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Trade Account Number
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveCustBankTradeLoans.aliveERPCustBankTradeAccts.tradeAccountNumber}
                        disabled
                        placeholder="Customer Name"
                    />
                </div>
                <div className="mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Approved Maximum Loan Tenure (Buyer Loan)
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveCustBankTradeLoans.aliveERPCustBankTradeAccts.maxLoanTenureDays + " Days"}
                        disabled
                        placeholder="Customer Name"
                    />
                </div>
                <div className="mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Approved Maximum Loan Tenure (Seller Loan)
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value=""
                        disabled
                        placeholder=""
                    />
                </div>

            </div>
            <div className="flex gap-3">
                <h1 className="font-medium text-xl">Foreign Exchange</h1>
                <div className="">
                    <Switch />
                </div>
            </div>
            <hr />
            <div className="flex gap-10 justify-around">
                <div className="mt-6 mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        FX Forward Exchange Contract Number
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={user?.aliveCustBankFXContract.aliveFXTradeDetails.FXForwardExchangeContractNum}
                        disabled
                        placeholder="Customer Name"
                    />
                </div>
                <div className="mt-6 mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        Start Date
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={formatDate(user?.aliveCustBankFXContract.aliveFXTradeDetails.startDate)}
                        disabled
                        placeholder="Customer Name"
                    />
                </div>
                <div className="mt-6 mb-5 relative w-1/3">
                    <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                        End Date
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                        value={formatDate(user?.aliveCustBankFXContract.aliveFXTradeDetails.endDate)}
                        disabled
                        placeholder="Customer Name"
                    />
                </div>
            </div>
            <div className="flex gap-3">
                <h1 className="font-medium text-xl">Bank Statement </h1>
                <div className="">
                    <Switch />
                </div>
            </div>

        </div>
    );
};

export default CustomerServiceManagement;
