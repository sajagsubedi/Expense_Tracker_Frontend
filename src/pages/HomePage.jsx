import React from "react";
import { AddTransaction,TransactionItem } from "../components/index.jsx";

export default function HomePage() {
  const transactions = [
	{
		_id: "1",
		userId: "1",
		description: "Transaction One",
		paymentType: "CASH",
		category: "expense",
		amount: 100.0,
		location: "Location One",
		date: "2024-01-01",
	},
	{
		_id: "2",
		userId: "2",
		description: "Transaction Two",
		paymentType: "CARD",
		category: "savings",
		amount: 200.0,
		location: "Location Two",
		date: "2024-01-02",
	},
	{
		_id: "3",
		userId: "3",
		description: "Transaction Three",
		paymentType: "CASH",
		category: "investment",
		amount: 300.0,
		location: "Location Three",
		date: "2024-01-03",
	},
	{
		_id: "4",
		userId: "4",
		description: "Transaction Four",
		paymentType: "CARD",
		category: "expense",
		amount: 400.0,
		location: "Location Four",
		date: "2024-01-04",
	},
	{
		_id: "5",
		userId: "5",
		description: "Transaction Five",
		paymentType: "CASH",
		category: "savings",
		amount: 500.0,
		location: "Location Five",
		date: "2024-01-05",
	},
];

    return (
        <main className="min-w-screen min-h-screen bg-gray-950 flex flex-col items-center pt-20">
            <AddTransaction />
          <section className="w-full md:px-16 py-10 px-10 flex flex-wrap gap-5 justify-around">
          {transactions.map((transactionItem,i)=>(<TransactionItem key={i} transactionItem={transactionItem}/>))}
          </section>
        </main>
    );
}
