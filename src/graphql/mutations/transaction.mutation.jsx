import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      _id
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: UpdateTransactionInput!) {
    updateTransaction(input: $input) {
      _id
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($input: ID!) {
    deleteTransaction(transactionId: $input) {
      _id
    }
  }
`;
