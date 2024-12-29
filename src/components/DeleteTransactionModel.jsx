import React from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_TRANSACTION,
  GET_TRANSACTIONS,
  GET_CATEGORY_STATISTICS,
} from "../graphql/index.jsx";
import { toast } from "react-toastify";

const DeleteTransactionModel = ({ transactionId, closeDeleteModel }) => {
  const [DeleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [GET_TRANSACTIONS, GET_CATEGORY_STATISTICS],
  });

  const handleDelete = async () => {
    try {
      await DeleteTransaction({
        variables: {
          input: transactionId,
        },
      });
      toast.success("Transaction deleted succesfully!");
    } catch (err) {
      toast.error("Error while deleting transcation!");
    } finally {
      closeDeleteModel();
    }
  };
  return (
    <div className="h-auto w-auto max-w-[460px] mx-5 backdrop-blur-3xl bg-pink-300 bg-opacity-10 fixed top-10 box-border rounded-lg py-5 px-3 shadow-2xl flex flex-col items-center z-10 text-white">
      <h3 className="font-bold text-red-500 text-xl mb-4">Delete</h3>
      <p className="text-white text-center">
        Are you sure you want to delete this transaction? This action cannot be
        undone.
      </p>

      <div className="w-full flex gap-2 px-4 justify-center mt-2">
        <button
          className="text-white bg-transparent border-2 border-red-500 py-1 px-3 w-48 rounded  mt-3"
          onClick={closeDeleteModel}
        >
          Cancel
        </button>
        <button
          className="text-white bg-red-500 w-48 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded mt-3"
          type="submit"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteTransactionModel;
