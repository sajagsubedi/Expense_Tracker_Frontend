import { useState } from "react";
import {
  AddTransaction,
  TransactionItem,
  ExpenseChart,
  EditTransaction,
  DeleteTransactionModel,
} from "../components/index.jsx";
import { GET_TRANSACTIONS, GET_AUTHUSER, LOG_OUT } from "../graphql/index.jsx";
import { useQuery, useMutation } from "@apollo/client";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

export default function HomePage(props) {
  const [transactionData, setTransactionData] = useState();
  const [transactionActive, setTransactionActive] = useState(false);
  const [deleteModelActive, setDeleteModelActive] = useState(false);
  const [toDeleteTranscation, setToDeleteTranscation] = useState();
  const navigate = useNavigate();

  const [Logout, { client }] = useMutation(LOG_OUT, {
    refetchQueries: [GET_AUTHUSER],
  });

  const { loading, data } = useQuery(GET_TRANSACTIONS);
  const { loading: authUserLoading, data: authUser } = props.authUser || {};

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

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await Logout();
      await client.resetStore();
      navigate("/signin");
      toast.success(response.data.logout.message || "Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message || "Logout failed!");
    }
  };

  if (loading || authUserLoading) return <h2>Loading...</h2>;

  return (
    <main className="min-w-screen min-h-screen bg-gray-950 px-8 flex flex-col items-center py-7">
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
      <section className="mb-10">
        <div>
          <h1 className="md:text-5xl text-3xl lg:text-6xl font-bold text-center relative z-50 text-white">
            Expense GQL
          </h1>
          <div className="relative mb-4 w-1/2 mx-auto hidden md:block">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          </div>
        </div>
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            Spend wisely, track wisely
          </p>
          {authUser?.authUser?.profilePicture && (
            <img
              src={authUser.authUser.profilePicture}
              className="w-8 h-8 rounded-full border cursor-pointer"
              alt="Avatar"
            />
          )}
          {!authUserLoading && (
            <MdLogout
              className="mx-2 w-5 h-5 cursor-pointer text-white"
              onClick={handleLogout}
            />
          )}
          {authUserLoading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
      </section>
      <section className="flex flex-col md:flex-row gap-5 items-center justify-between">
        {data?.transactions?.length > 0 && <ExpenseChart />}
        <AddTransaction isSingle={!data?.transactions?.length} />
      </section>
      <section className="w-full mt-20">
        <h2 className="text-4xl text-center font-bold text-white">History</h2>
        <hr className="mt-7 border-gray-800" />
        <div className="w-full md:px-16 py-10 px-10 flex flex-wrap gap-5 justify-around">
          {!data?.transactions?.length && (
            <h3 className="text-2xl font-medium text-white">
              Add transactions to view
            </h3>
          )}
          {data?.transactions?.length > 0 &&
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

// Define PropTypes for the component
HomePage.propTypes = {
  authUser: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.shape({
      authUser: PropTypes.shape({
        profilePicture: PropTypes.string,
      }),
    }),
  }),
};

// Optionally, define default props if authUser is optional
HomePage.defaultProps = {
  authUser: {
    loading: true,
    data: null,
  },
};
