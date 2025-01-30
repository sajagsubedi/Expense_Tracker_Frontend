import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation Signup($input: SignUpInput!) {
    signup(input: $input) {
      _id
      name
      email
      password
      gender
      profilePicture
    }
  }
`;

export const SIGN_IN = gql`
  mutation Signin($input: SignInInput!) {
    signin(input: $input) {
      _id
      name
      email
      password
      gender
      profilePicture
    }
  }
`;

export const LOG_OUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
