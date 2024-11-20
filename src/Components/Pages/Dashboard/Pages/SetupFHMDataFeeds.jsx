import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const SetupFHMDataFeeds = ({ customerBankRelID, onReturnValue }) => {
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
            const response = await fetch("/public/Setup FHM Data Feeds.json");
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
            console.log("HERER aa", customer)


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


    // Initial state for the checkboxes
    const [dataFeeds, setDataFeeds] = useState({
        AccountsPayable: true,
        AccountsReceivable: true,
        CreditNotes: true,
        Inventory: false,
        FinancialStatements: false,
        BuyerSellerLoans: false,
    });

    // Handler for checkbox changes
    const handleCheckboxChange = (feed) => {
        setDataFeeds((prevState) => ({
            ...prevState,
            [feed]: !prevState[feed],
        }));
    };

    // Handlers for buttons
    const handleAccept = () => {
        console.log("Accepted:", dataFeeds);
        alert("Accepted successfully!");
    };

    const handleReject = () => {
        console.log("Rejected:", dataFeeds);
        alert("Rejected.");
    };

    const handleHold = () => {
        console.log("On Hold:", dataFeeds);
        alert("Put on hold.");
    };


    return (
        <>
            <div className="max-w-[1200px] mx-auto pt-10 rounded-lg ">
                <div className="flex gap-6">
                    <div className="">
                        <button onClick={sendValueBack} className="text-4xl"><MdOutlineKeyboardBackspace /></button>
                    </div>
                    <h1 className="font-medium text-3xl mb-4">Setup FHM Data Feeds</h1>
                </div>
                <h1 className="font-medium text-xl mb-1 mt-10">General</h1>
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
                            value={user?.aliveERPOrganizations.erpOrganizationname}
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
                <div className="flex gap-10 justify-around">
                    <div className="mt-6 mb-5 relative w-1/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Customer Email
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveERPOrganizations.aliveERPOrgContacts.emailID}
                            disabled
                            placeholder="Customer Country"
                        />
                    </div>
                    <div className="mt-6  mb-5 relative w-1/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Customer Phone
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={user?.aliveERPOrganizations.aliveERPOrgContacts.phone}
                            disabled
                        />
                    </div>
                    <div className="mt-6 mb-5 relative w-1/3">
                        <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
                            Application Date
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
                            value={formatDate(user?.startDate)}
                            disabled
                            placeholder="Customer Name"
                        />
                    </div>
                </div>

                <h1 className="font-medium text-xl mb-1 mt-10">FHM Data Feeds</h1>
                <hr />
                <div style={{ padding: "20px", fontFamily: "Arial" }}>
                    <h4>
                        Select/Unselect below FHM Data Feeds. The selected data feeds will be
                        eligible for scheduling and data will be pulled from ERP customer
                        system on a schedule basis.
                    </h4>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {Object.keys(dataFeeds).map((feed) => (
                            <li key={feed} style={{ margin: "10px 0" }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={dataFeeds[feed]}
                                        onChange={() => handleCheckboxChange(feed)}
                                    />
                                    {" " + feed.replace(/([A-Z])/g, " $1").trim()}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end w-full">
                        <div style={{ marginTop: "20px" }}>
                            <button
                                style={{ backgroundColor: "green", color: "white", margin: "0 10px" }}
                                onClick={handleAccept}
                                className="px-2 py-1 rounded-sm"
                            >
                                ACCEPT
                            </button>
                            <button
                                style={{ backgroundColor: "red", color: "white", margin: "0 10px" }}
                                onClick={handleReject}
                                className="px-2 py-1 rounded-sm"
                            >
                                REJECT
                            </button>
                            <button
                                style={{ backgroundColor: "orange", color: "white", margin: "0 10px" }}
                                onClick={handleHold}
                                className="px-2 py-1 rounded-sm"
                            >
                                HOLD
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
export default SetupFHMDataFeeds