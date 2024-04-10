import { gql } from "@apollo/client";

const GET_AUTHUSER = gql`
  query GetAuthUser {
    authUser {
      _id
      name
      email
      password
      gender
      profilePicture
    }
  }
`;

export { GET_AUTHUSER };
