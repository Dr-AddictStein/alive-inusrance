import React, { useEffect, useState } from "react";

const TrStep3 = (props, fromLoan) => {
  const [lineData, setLineData] = useState(props.props);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState("");

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        const response = await fetch(
          "../../../../../public/getPaymentTypes.json"
        );

        const data = await response.json();

        setPaymentTypes(data);
      } catch (error) {
        console.log("Could Not fetch Payment Types", error);
      }
    };

    fetchPaymentTypes();
  }, []);
  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await fetch("../../../../../public/bankAccounts.json");

        const data = await response.json();

        const keep=data.Accounts;

        setBankAccounts(keep);
        
      } catch (error) {
        console.log("Could Not fetch Payment Types", error);
      }
    };
    
    fetchBankAccounts();

  }, []);



  useEffect(() => {
    const setupTable = () => {
      let dex = [];
      for (let i = 0; i < lineData.length; i++) {
        let temp = {
          Number: lineData[i].Number,
          Date: lineData[i].Date,
          DueDate: lineData[i].DueDate,
          VendorName: lineData[i].VendorName,
          InvoiceAmount: lineData[i].InvoiceAmount,
          Currency: lineData[i].Currency,
          PaymetType: paymentTypes[0],
          AccountName: '',
          AccountBalance: ''
        };

        if(bankAccounts.length>0){
          temp = {
            Number: lineData[i].Number,
            Date: lineData[i].Date,
            DueDate: lineData[i].DueDate,
            VendorName: lineData[i].VendorName,
            InvoiceAmount: lineData[i].InvoiceAmount,
            Currency: lineData[i].Currency,
            PaymetType: paymentTypes[0],
            AccountName: bankAccounts[0].Name,
            AccountBalance: bankAccounts[0].Balance
          };
        }

        dex.push(temp);
      }
      setRowData(dex);
      console.log("here RowData ", dex);
    };

    setupTable();
  }, [lineData,paymentTypes,bankAccounts]);

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

  const handleDropdownChange=(e,ln)=>{
    const selectedAccountName = e.target.value;
    const updatedRowData = rowData.map(row => {
      if (row.Number === ln.Number) {
        // Update AccountName and AccountBalance
        row.AccountName = selectedAccountName;
        row.AccountBalance = bankAccounts.find(account => account.Name === selectedAccountName)?.Balance || 0;
      }
      return row;
    });
    setRowData(updatedRowData);
  }

  return (
    <div>
      <table className="table w-full">
        <thead>
          <th className="">Number</th>
          <th className="">Date</th>
          <th className="">Due Date </th>
          <th className="">Vendor Name</th>
          <th className="">Invoice Amount</th>
          <th>Currency</th>
          <th>Payment Type</th>
          <th>Account Name</th>
          <th>Account Balance</th>
        </thead>
        <tbody className="">
          {rowData.map((ln) => {
            return (
              <tr key={ln} className="border-b-2 py-6">
                <td className="text-center">{ln.Number}</td>
                <td className="text-center">{formatDate(ln.Date)}</td>
                <td className="text-center">{formatDate(ln.DueDate)}</td>
                <td className="text-center">{ln.VendorName}</td>
                <td className="text-center">{ln.InvoiceAmount}</td>
                <td className="text-center">{ln.Currency}</td>
                <td className="text-center">
                  <select
                    className=""
                    onChange={(e) => {
                      for (let i = 0; i < rowData.length; i++) {
                        if (rowData[i].Number === ln.Number) {
                          rowData[i].PaymetType = e.target.value;
                          break;
                        }
                      }
                      console.log("ADDDDD@", ln.PaymetType);
                    }}
                  >
                    {paymentTypes.map((pm) => {
                      return (
                        <option key={pm} value={`${pm}`}>
                          {pm}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td className="text-center">
              <select
                className=""
                value={ln.AccountName}
                onChange={(e) => handleDropdownChange(e, ln)}
              >
                {bankAccounts.map(pm => (
                  <option key={pm.Name} value={pm.BankAccountNumber}>
                    {pm.Name}
                  </option>
                ))}
              </select>
            </td>
            <td className="text-center">{ln.AccountBalance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TrStep3;
