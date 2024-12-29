import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  CREATE_TRANSACTION,
  GET_TRANSACTIONS,
  GET_CATEGORY_STATISTICS,
} from "../graphql/index.jsx";
import { useMutation } from "@apollo/client";
import { toast } from 'react-toastify';

export default function AddTransaction({isSingle}) {
  const [formData, setFormData] = useState({
    description: "",
    paymentType: "Select",
    category: "Select",
    date: "",
    location: "",
    amount: "",
  });
  const [paymentTypeActive, setPaymentTypeActive] = useState(false);
  const [categoryActive, setCategoryActive] = useState(false);
  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [CreateTransaction] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [GET_TRANSACTIONS, GET_CATEGORY_STATISTICS],
  });

  const handleAmountChange = (e) => {
    if (e.target.value == "") {
      setFormData((p) => ({ ...p, amount: e.target.value }));
      return;
    }
    let numericValue = Number.parseFloat(e.target.value);
    if (isNaN(numericValue)) {
      return;
    }
    setFormData((p) => ({ ...p, amount: numericValue }));
  };

  const setDropDownValue = (type, value) => {
    if (type == "paymentType") {
      setPaymentTypeActive(false);
      setFormData((p) => ({ ...p, paymentType: value }));
    }
    if (type == "category") {
      setCategoryActive(false);
      setFormData((p) => ({ ...p, category: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CreateTransaction({
        variables: {
          input: formData,
        },
      });
      toast.success("Transaction added succesfully!")
    } catch (error) {
      toast.error("Error while creating transcation!")
    } finally {
      setFormData({
        description: "",
        paymentType: "Select",
        category: "Select",
        date: "",
        location: "",
        amount: "",
      });
    }
  };
  return (
    <form className={`w-full ${isSingle?"md:w-max":"md:w-1/2"}  bg-gray-900 m-5 rounded-md drop-shadow-xl flex flex-col px-4 py-3 gap-3 justify-center items-center`}>
      <div className="flex w-full flex-col">
        <label
          htmlFor="description"
          className="leading-7 text-base text-gray-200"
        >
          Transaction
        </label>
        <input
          type="text"
          value={formData.description}
          name="description"
          placeholder="Rent, Groceries, Salary,etc"
          onChange={handleFormChange}
          className="w-full bg-gray-800 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 text-base outline-none text-gray-100 py-2 px-3  transition-colors leading-8 duration-200 ease-in-out"
        />
      </div>
      <div className="flex flex-row gap-2 border-box w-full">
        <div className="flex  flex-col w-1/3 relative gap-2">
          <label
            htmlFor="paymentType"
            className="leading-4 text-sm text-gray-200 text-nowrap"
          >
            Payment Type
          </label>
          <div
            className=" bg-gray-800 rounded border border-gray-700 w-full hover:border-pink-500 hover:ring-2 hover:ring-pink-900 text-base flex text-gray-100 px-3 leading-8 items-center justify-around gap-2 relative h-10"
            onClick={() => setPaymentTypeActive((p) => !p)}
          >
            <span>{formData.paymentType.toUpperCase()}</span>
            <FaChevronDown className="text-white" />
          </div>
          <div
            className={`w-full h-0 ${
              paymentTypeActive ? " h-14" : ""
            } absolute bg-gray-800 top-16 rounded flex flex-col px-3 justify-between shadow-lg overflow-hidden shadow-gray-900 text-white`}
          >
            <li
              className="list-none mt-2"
              onClick={() => setDropDownValue("paymentType", "cash")}
            >
              CASH
            </li>
            <li
              className="list-none mb-2"
              onClick={() => setDropDownValue("paymentType", "card")}
            >
              CARD
            </li>
          </div>
        </div>
        <div className="flex  flex-col w-1/3 relative gap-2">
          <label
            htmlFor="category"
            className="leading-4 text-sm text-gray-200 text-nowrap"
          >
            Category
          </label>
          <div
            className=" bg-gray-800 rounded border border-gray-700 w-full hover:border-pink-500 hover:ring-2 hover:ring-pink-900 text-base flex text-gray-100 px-3 leading-8 items-center justify-around gap-2 relative h-10"
            onClick={() => setCategoryActive((p) => !p)}
          >
            <span>{formData.category.toUpperCase()}</span>
            <FaChevronDown className="text-white" />
          </div>
          <div
            className={`w-full h-0 ${
              categoryActive ? " h-auto" : ""
            } absolute bg-gray-800 top-16 rounded flex flex-col px-3 justify-between shadow-lg overflow-hidden shadow-gray-900 gap-2 text-white`}
          >
            <li
              className="list-none mt-2"
              onClick={() => setDropDownValue("category", "savings")}
            >
              SAVINGS
            </li>
            <li
              className="list-none"
              onClick={() => setDropDownValue("category", "expense")}
            >
              EXPENSE
            </li>
            <li
              className="list-none mb-2"
              onClick={() => setDropDownValue("category", "investment")}
            >
              INVESTMENT
            </li>
          </div>
        </div>
        <div className="flex  flex-col w-1/3 gap-2">
          <label
            htmlFor="description"
            className="leading-4 text-sm text-gray-200 text-nowrap"
          >
            Amount
          </label>
          <input
            onChange={handleAmountChange}
            value={formData.amount}
            placeholder="150"
            name="amount"
            className="w-full h-10 text-gray-200 border-gray-700 rounded bg-gray-800 focus:ring-2 focus:ring-pink-900 border focus:border-pink-500 outline-none p-2"
          />
        </div>
      </div>
      <div className="w-full flex gap-2">
        <div className="flex  flex-col w-1/2 gap-2">
          <label
            htmlFor="location"
            className="leading-4 text-sm text-gray-200 text-nowrap"
          >
            Location
          </label>
          <input
            placeholder="Pokhara,Kathmandu..."
            name="location"
            value={formData.location}
            onChange={handleFormChange}
            className="w-full h-10 text-gray-200 border-gray-700 rounded bg-gray-800 focus:ring-2 focus:ring-pink-900 border focus:border-pink-500 outline-none"
          />
        </div>
        <div className="flex  flex-col w-1/2 gap-2">
          <label
            htmlFor="date"
            className="leading-4 text-sm text-gray-200 text-nowrap"
          >
            Date
          </label>
          <input
            placeholder="mm/dd/yyyy"
            value={formData.date}
            name="date"
            onChange={handleFormChange}
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            className="w-full appearance-none  box-border max-h-10 text-gray-200 border-gray-700 rounded bg-gray-800 focus:ring-2 focus:ring-pink-900 border focus:border-pink-500 outline-none p-2"
          />
        </div>
      </div>
      <button
        className="text-white bg-pink-500 border-0 py-1 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg w-full mt-3"
        type="submit"
        onClick={handleSubmit}
      >
        Add Transaction
      </button>
    </form>
  );
}
