import { SIGN_UP, SIGN_IN } from "./mutations/user.mutation.jsx";
import { GET_AUTHUSER } from "./queries/user.query.jsx";
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "./mutations/transaction.mutation.jsx";
import {
  GET_TRANSACTIONS,
  GET_CATEGORY_STATISTICS,
} from "./queries/transaction.query.jsx";

export {
  SIGN_IN,
  SIGN_UP,
  GET_AUTHUSER,
  CREATE_TRANSACTION,
  GET_TRANSACTIONS,
  GET_CATEGORY_STATISTICS,
  UPDATE_TRANSACTION,
};
