import React, { useEffect, useState } from "react";
import {
  AddTransaction,
  TransactionItem,
  ExpenseChart,
  EditTransaction,
  DeleteTransactionModel,
} from "../components/index.jsx";
import { GET_TRANSACTIONS } from "../graphql/index.jsx";
import { useQuery } from "@apollo/client";

export default function HomePage() {
  const [transactionData, setTransactionData] = useState();
  const [transactionActive, setTransactionActive] = useState(false);
  const [deleteModelActive, setDeleteModelActive] = useState(false);
  const [toDeleteTranscation, setToDeleteTranscation] = useState();

  const { loading, data } = useQuery(GET_TRANSACTIONS);
  if (loading) return <h2>Loading...</h2>;

  const openEditModel = (transData) => {
    const { _id, description, paymentType, category, date, location, amount } =
      transData;
    setTransactionData({
      _id,
      description,
      paymentType,
      category,
      date,
      location,
      amount,
    });
    setTransactionActive(true);
    setDeleteModelActive(false);
    setToDeleteTranscation("");
  };

  const closeModel = () => {
    setTransactionActive(false);
  };

  const openDeleteModel = (transId) => {
    setToDeleteTranscation(transId);
    setTransactionActive(false);
    setDeleteModelActive(true);
  };

  const closeDeleteModel = () => {
    setDeleteModelActive(false);
    setToDeleteTranscation("");
  };

  return (
    <main className="min-w-screen min-h-screen bg-gray-950 px-8 flex flex-col items-center pt-20">
      {transactionActive && (
        <EditTransaction
          closeModel={closeModel}
          transactionData={transactionData}
        />
      )}
      {deleteModelActive && (
        <DeleteTransactionModel
          transactionId={toDeleteTranscation}
          closeDeleteModel={closeDeleteModel}
        />
      )}
      <section className="flex flex-col md:flex-row gap-5 items-center justify-between">
        {data?.transactions?.length !== 0 && <ExpenseChart />}
        <AddTransaction isSingle={data?.transactions?.length === 0} />
      </section>
      <section className="w-full mt-20">
        <h2 className="text-4xl text-center font-bold text-white">History</h2>
        <hr className="mt-7 border-gray-800" />
        <div className="w-full md:px-16 py-10 px-10 flex flex-wrap gap-5 justify-around">
          {data?.transactions?.length === 0 && (
            <h3 className="text-2xl font-medium text-white">
              Add transactions to view
            </h3>
          )}
          {data?.transactions?.length !== 0 &&
            data.transactions.map((transactionItem, i) => (
              <TransactionItem
                key={i}
                transactionItem={transactionItem}
                openEditModel={openEditModel}
                openDeleteModel={openDeleteModel}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
