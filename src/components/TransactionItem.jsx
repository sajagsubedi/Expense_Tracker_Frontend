import { MdDelete ,MdOutlineDescription,MdPayment,MdAttachMoney,MdLocationOn } from "react-icons/md";
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
            className={`w-full h-auto rounded md:w-[30%] sm:w-[45%] flex flex-col bg-gradient-to-br gap-3 px-3 ${cardClass} p-2`}
        >
            <div className="w-full flex justify-between">
                <h2 className="text-xl font-bold text-white">{category}</h2>
                <div className="flex gap-2">
                    <MdDelete className="text-white" />
                    <FaEdit className="text-white" />
                </div>
            </div>
                <p className="flex text-white"><span className="font-medium flex items-center w-max h-max"><MdOutlineDescription/> Description:</span>{description}</p>
                <p className="flex text-white"><span className="font-medium flex items-center w-max h-max"><MdPayment/>  Payment Type: </span>{paymentType}</p>
                <p className="flex text-white"><span className="font-medium flex items-center w-max h-max"><MdAttachMoney/> Amount: </span>{amount}</p>
                <p className="flex text-white"><span className="font-medium flex items-center w-max h-max"><MdLocationOn />Location: </span>{location}</p>
                <p className="flex text-black text-sm font-medium self-">{date}</p>
  </div>
    );
}
