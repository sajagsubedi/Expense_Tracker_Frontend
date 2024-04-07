export default function TransactionItem({transactionItem}){
  const{description,paymentType,category,amount,location,date}=transactionItem;
  return(
    <div className={`w-full h-auto rounded md:w-[30%] flex flex-col gap-3 ${category=="savings" && "bg-cyan-500"} ${category=="investment" && "bg-pink-500"} ${category=="expense" && "bg-lime-500"}`}>
    <h2 className="text-center text-xl font-bold text-white">{category}</h2>
    </div>
    )
}