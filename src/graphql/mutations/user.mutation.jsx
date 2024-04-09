import { gql } from "@apollo/client";

export const SIGN_UP = gql`
    mutation signup(
        $name: String!
        $email: String!
        $password: String!
        $gender: String!
    ) {
        signup(
            name: $name
            email: $email
            password: $password
            gender: $gender
        ) {
          _id
          name
          email
          profilePicture
          gender
          password
        }
    }
`;
