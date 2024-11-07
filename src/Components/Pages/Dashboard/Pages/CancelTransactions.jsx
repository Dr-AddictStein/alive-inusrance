import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import ViewTransactionsDetails from "./ViewTransactionsDetails";

const CancelTransactions = ({ bank, onReturnValue }) => {
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

  const [searchNumber, setSearchNumber] = useState(""); // New state for search by Number

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
      <div className="flex gap-6">
        <div className="">
          <button onClick={sendValueBack} className="text-4xl">
            <MdOutlineKeyboardBackspace />
          </button>
        </div>
        <h1 className="font-medium text-3xl mb-4">Cancel Transactions</h1>
      </div>

      <div className=" py-4">
        {`
          Note: The transactions can be put on hold for various reasons like
          "Insufficient funds” in requested bank account, user requested for
          putting hold on transaction fulfillment, etc. Upon completing the hold
          process, the transaction status will be updated in customer portal
          against the transaction(s) with hold reason note pouplated from bank
          side.`}
      </div>

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
              <th>Amount</th>
              <th>Currency</th>
              <th>Customer Name</th>
              <th>ERP Application</th>
              <th>Hold Reason</th>
            </tr>
          </thead>
          <tbody>
            {
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
                      .paymentAmount
                  }
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
                  {`Insufficient Funds`}
                </td>
              </tr>
            }
          </tbody>
        </table>
        <div className="flex justify-end gap-2 mt-8">
          <button className="bg-slate-500 text-white px-4 py-2 rounded-sm">
            Cancel
          </button>
          <button className="bg-slate-500 text-white px-4 py-2 rounded-sm">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelTransactions;
