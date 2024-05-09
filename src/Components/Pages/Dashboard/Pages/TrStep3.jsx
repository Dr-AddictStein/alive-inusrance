import React, { useState } from "react";

const TrStep3 = (props,fromLoan) => {
  const [lineData, setLineData] = useState(props.props);

  function formatDate(dateString) {
    // Extract the timestamp from the string
    const timestamp = parseInt(dateString.match(/\d+/)[0]);

    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Array of month names
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

    // Get day, month, and year
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Format the date as "day month year"
    return `${day} ${month} ${year}`;
  } 

  return (
    <div>
      <table className="table w-full">
        <thead>
          <th className="text-blue-600">Number</th>
          <th className="text-blue-600">Date</th>
          <th className="text-blue-600">Due Date </th>
          <th className="text-blue-600">Vendor Name</th>
          <th className="text-blue-600">Invoice Amount</th>
          <th>Currency</th>
          <th>Payment Type</th>
          <th>Account Number</th>
          <th>Account Balance</th>
        </thead>
        <tbody className="text-blue-600">
          {lineData.map((ln) => {
            return (
              <tr key={ln} className="border-b-2 py-6">
                <td className="text-center">{ln.Number}</td>
                <td className="text-center">{formatDate(ln.Date)}</td>
                <td className="text-center">{formatDate(ln.DueDate)}</td>
                <td className="text-center">{ln.VendorName}</td>
                <td className="text-center">{ln.InvoiceAmount}</td>
                <td className="text-center">{ln.Currency}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TrStep3;
