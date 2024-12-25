import React from "react";
import {
  AddTransaction,
  TransactionItem,
  ExpenseChart,
} from "../components/index.jsx";
import {
  GET_TRANSACTIONS,
} from "../graphql/index.jsx";
import { useQuery } from "@apollo/client";

export default function HomePage() {
  const { loading, data } = useQuery(GET_TRANSACTIONS);
  if (loading) return null;

  return (
    <main className="min-w-screen min-h-screen bg-gray-950 xl:px-20 px-8 flex flex-col items-center pt-20">
      <section className="flex flex-col md:flex-row gap-5 px-10 items-center justify-around">
        <ExpenseChart />
        <AddTransaction />
      </section>
      <section className="w-full mt-20">
        <h2 className="text-4xl text-center font-bold text-white">History</h2>
        <div className="w-full md:px-16 py-10 px-10 flex flex-wrap gap-5 justify-around">
          {data.transactions.map((transactionItem, i) => (
            <TransactionItem key={i} transactionItem={transactionItem} />
          ))}
        </div>
      </section>
    </main>
  );
}
