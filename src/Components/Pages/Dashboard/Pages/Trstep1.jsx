import React, { useEffect, useState } from "react";

const Trstep1 = () => {
  const [selectedOptionSelectorERP, setSelectedOptionSelectorERP] =
    useState("");
  const [selectedOptionSelectorBank, setSelectedOptionSelectorBank] =
    useState("");
  const [selectedOptionSelectorOrg, setSelectedOptionSelectorOrg] =
    useState("");
  const [selectedOptionSelectorService, setSelectedOptionSelectorService] =
    useState("");

  const handleOptionChangeForSelectorsERP = (event) => {
    setSelectedOptionSelectorERP(event.target.value);
  };
  const handleOptionChangeForSelectorsBank = (event) => {
    setSelectedOptionSelectorBank(event.target.value);
  };
  const handleOptionChangeForSelectorsOrg = (event) => {
    setSelectedOptionSelectorOrg(event.target.value);
  };
  const handleOptionChangeForSelectorsService = (event) => {
    setSelectedOptionSelectorService(event.target.value);
  };

  // transaction works starts here
  const [erpApplications, setErpApplications] = useState([]);

  const fetchErpApplications = async () => {
    try {
      const response = await fetch(
        "../../../../../public/ERP Application Organization.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch");
      }
      const data = await response.json();
      setErpApplications(data);
    } catch (error) {
      console.log("Could not fetch", error);
    }
  };
  useEffect(() => {
    fetchErpApplications();
  }, []);
  const filteredOrganizations = selectedOptionSelectorERP
    ? erpApplications.find((app) => app.name === selectedOptionSelectorERP)
        ?.organizations
    : [];

  const [Banks, setBanks] = useState([]);

  const fetchBanks = async () => {
    try {
      const response = await fetch("../../../../../public/Bank Services.json");
      if (!response.ok) {
        throw new Error("Could not fetch");
      }
      const data = await response.json();
      setBanks(data);
      console.log("sadasdsdsaad", Banks);
    } catch (error) {
      console.log("Could not fetch", error);
    }
  };
  useEffect(() => {
    fetchBanks();
  },[]);
  const filteredBanks = selectedOptionSelectorBank
    ? Banks.find((app) => app.bankName === selectedOptionSelectorBank)?.services
    : [];
  return (
    <div>
      <div className="mb-5 relative">
        <label className="block text-sm font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
          Select ERP Application
        </label>
        <select
          id="erpSelect"
          name="erpSelect"
          className="mt-1 text-blue-400 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500  sm:text-sm rounded-md"
          value={selectedOptionSelectorERP}
          onChange={handleOptionChangeForSelectorsERP}
        >
          <option disabled value="">
            Select ERP Application
          </option>
          {erpApplications.map((erpApplication) => {
            return (
              <option key={erpApplication} value={`${erpApplication.name}`}>
                {erpApplication.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mt-6 mb-5 relative">
        <label className="block text-sm font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
          Select Bank
        </label>
        <select
          id="erpSelect"
          name="erpSelect"
          className="mt-1 text-blue-400 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500  sm:text-sm rounded-md"
          value={selectedOptionSelectorBank}
          onChange={handleOptionChangeForSelectorsBank}
        >
          <option disabled value="">
            Select Bank
          </option>
          {Banks.map((bank) => {
            return (
              <option key={bank} value={`${bank.bankName}`}>
                {bank.bankName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mt-6 mb-5 relative">
        <label className="block text-sm font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
          Select Organization
        </label>
        <select
          id="erpSelect"
          name="erpSelect"
          className="mt-1 text-blue-400 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500  sm:text-sm rounded-md"
          value={selectedOptionSelectorOrg}
          onChange={handleOptionChangeForSelectorsOrg}
        >
          <option disabled value="">
            Select Organization
          </option>
          {filteredOrganizations.map((org) => {
            return (
              <option key={org} value={`${org.orgName}`}>
                {org.orgName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mt-6 mb-5 relative">
        <label className="block text-sm font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">
          Select Service
        </label>
        <select
          id="erpSelect"
          name="erpSelect"
          className="mt-1 text-blue-400 mb-5 block w-full pl-3 pr-10 py-4 text-base border bg-transparent border-gray-300 focus:outline-none focus:ring-blue-500  sm:text-sm rounded-md"
          value={selectedOptionSelectorService}
          onChange={handleOptionChangeForSelectorsService}
        >
          <option disabled value="">
            Select Services
          </option>
          {filteredBanks.map((ser) => {
            return (
              <option key={ser} value={`${ser}`}>
                {ser}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Trstep1;
