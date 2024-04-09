import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function TransactionItem({ transactionItem }) {
    let { description, paymentType, category, amount, location, date } =
        transactionItem;
    const categoryColor = {
        savings: "from-green-700 to-green-400",
        expense: "from-pink-700 to-pink-400",
        investment: "from-blue-700 to-blue-400"
    };
    const cardClass = categoryColor[category];
    category = category[0]?.toUpperCase() + category.slice(1);
    description = description[0]?.toUpperCase() + description.slice(1);
    return (
        <div
            className={`w-full h-auto rounded md:w-[30%] flex flex-col bg-gradient-to-br gap-3 px-3 ${cardClass} p-2`}
        >
            <div className="w-full flex justify-between">
                <h2 className="text-xl font-bold text-white">{category}</h2>
                <div className="flex gap-2">
                    <MdDelete className="text-white" />
                    <FaEdit className="text-white" />
                </div>
            </div>
            <div className="flex flex-col gap-2 text-white">
                <p><span className="font-medium mr-1">Description:</span>{description}</p>
                <p><span className="font-medium mr-1">Payment Type:</span>{paymentType}</p>
                <p><span className="font-medium mr-1">Amount :</span>{amount}</p>
                <p><span className="font-medium mr-1">Location :</span>{location}</p>
            </div>
        </div>
    );
}
