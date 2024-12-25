import { gql } from "@apollo/client";

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      _id
      userId
      description
      paymentType
      amount
      category
      location
      date
    }
  }
`;

const GET_CATEGORY_STATISTICS = gql`
  query CategoryStatistics {
    categoryStatistics {
      category
      amount
    }
  }
`;

export { GET_TRANSACTIONS, GET_CATEGORY_STATISTICS };
