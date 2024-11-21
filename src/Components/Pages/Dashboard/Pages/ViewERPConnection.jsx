import React, { useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const ViewERPConnection = ({ customerBankRelID, onReturnValue }) => {
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
  const [allApplications, setAllApplications] = useState(null);
  const [user, setUser] = useState(null);
  const fetchCustomerApplications = async () => {
    try {
      const response = await fetch("/public/View ERP Connection.json");
      if (!response.ok) {
        throw new Error("Could not fetch");
      }
      const data = await response.json();
      setAllApplications(data.aliveERPConnections);
      let dex;
      for (let i = 0; i < data.aliveERPConnections.length; i++) {
        if (data.aliveERPConnections[i].erpConnectionID === customerBankRelID) {
          dex = data.aliveERPConnections[i];
          break;
        }
      }
      setUser(dex);
      console.log("AAAAA", dex);
    } catch (error) {
      console.log("could not fetch Vendors", error);
    }
  };

  useEffect(() => {
    fetchCustomerApplications();
  }, []);

  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const toggleSecretVisibility = () => {
    setIsSecretVisible(!isSecretVisible);
  };
  return (
    <div className="max-w-[1200px] mx-auto pt-10 rounded-lg ">
      <div className="flex gap-6">
                <div className="">
                    <button onClick={sendValueBack} className="text-4xl">
                        <MdOutlineKeyboardBackspace />
                    </button>
                </div>
                <h1 className="font-medium text-3xl mb-4">View ERP Connection</h1>
            </div>
      <h1 className="font-medium text-xl mt-6 mb-2">Connection Details</h1>
      <hr />

      <div className="flex gap-10 justify-around">
        <div className="mt-6 mb-5 relative w-1/3">
          {user?.aliveERPConnections?.aliveERPApplications
            ?.erpApplicationName !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              ERP Application
            </label>
          )}
          <input
            id="applicationStatus"
            name="applicationStatus"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={
              user?.aliveERPConnections?.aliveERPApplications
                ?.erpApplicationName
            }
            disabled
          />
        </div>
        <div className="mt-6 mb-5 relative w-1/3">
          {user?.aliveERPConnections?.erpOrganizationname !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              Organization Name
            </label>
          )}
          <input
            id="applicationStatus"
            name="applicationStatus"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={user?.aliveERPConnections?.erpOrganizationname}
            disabled
          />
        </div>
        <div className="mt-6 mb-5 relative w-1/3">
          {user?.aliveERPConnections?.startDate !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              Start Date
            </label>
          )}
          <input
            id="applicationStatus"
            name="applicationStatus"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={formatDate(user?.aliveERPConnections?.startDate)}
            disabled
          />
        </div>
      </div>
      <div className="flex gap-10 justify-start">
        <div className="mb-5 relative w-[31%]">
          {user?.aliveERPConnections?.startDate !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              End Date
            </label>
          )}
          <input
            id="applicationStatus"
            name="applicationStatus"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={formatDate(user?.aliveERPConnections?.startDate)}
            disabled
          />
        </div>
      </div>

      <h1 className="font-medium text-xl mb-2">Connection Details</h1>
      <hr />
      <div className="flex gap-10 justify-around">
        <div className="mt-6 mb-5 relative w-1/3">
          {user?.aliveERPConnections?.aliveERPApplications
            ?.erpApplicationName !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              ERP Client ID
            </label>
          )}
          <input
            id="applicationStatus"
            name="applicationStatus"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={user?.aliveERPConnections?.erpClientID}
            disabled
          />
        </div>
        <div className="mt-6 mb-5 relative w-1/3">
          <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
            ERP Client Secret
          </label>
          <input
            type={isSecretVisible ? "text" : "password"}
            id="customerName"
            name="customerName"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={
              user?.aliveERPConnections.erpClientSecret
            }
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
          {user?.aliveERPConnections?.startDate !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              API Tokens
            </label>
          )}
          <input
            id="applicationStatus"
            name="applicationStatus"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={user?.apitokens}
            disabled
          />
        </div>
      </div>
      <div className="flex gap-10 justify-start">
        <div className="mb-5 relative w-[31%]">
          {user?.aliveERPConnections?.startDate !== "" && (
            <label className="block text-sm font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700">
              Connection Status
            </label>
          )}
          <input
            id="applicationStatus"
            name="applicationStatus"
            className="mt-1 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md"
            value={user?.connectionStatus}
            disabled
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button className="bg-slate-500 text-white px-4 py-2 rounded-sm">
          Save
        </button>
        <button className="bg-slate-500 text-white px-4 py-2 rounded-sm">
          Test Connection
        </button>
        <button className="bg-slate-500 text-white px-4 py-2 rounded-sm">
          De-Active
        </button>
      </div>
    </div>
  );
};

export default ViewERPConnection;
