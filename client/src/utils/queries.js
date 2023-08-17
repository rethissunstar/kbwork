import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const GET_SWITCHES = gql`
  query GetSwitches {
    switches {
      _id
      brand
      product
      switchType
      quantity
      price
      imageURL
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_KEYBOARDS = gql`
  query GetKeyboards {
    keyboards {
      _id
      switches
      quantity
      price
      plate
      model
      keycaps
      imageURL
      hotswap
      color
      case
      brand
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_KEYCAPS = gql`
  query GetKeycaps {
    keycaps {
      _id
      brand
      model
      price
      quantity
      imageURL
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_DESKMATS = gql`
  query GetDeskMats {
    deskmats {
      _id
      brand
      model
      price
      quantity
      imageURL
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_ACCESSORIES = gql`
  query GetAccessories {
    accessories {
      _id
      brand
      model
      price
      quantity
      imageURL
    }
  }
`;

export const USER_QUERY = gql`
  query GetUser($_id: ID!) {
    user(_id: $_id) {
      _id
      firstName
      lastName
      email
      address
      city
      country
      stateProvince
      postalCode
      phoneNumber
    }
  }
`;

export const VERIFY_TOKEN_QUERY = gql`
  query VerifyToken($token: String!) {
    verifyToken(token: $token) {
      _id
      email
    }
  }
`;

export const USER_ORDERS_QUERY = gql`
  query GetUserOrders($_id: ID!) {
    getUserOrders(_id: $_id) {
      _id
      orderItems {
        productId
        quantity
        price
        brand
        model
        image
      }
      orderTotal
      orderSubTotal
      orderTax
      createdAt
      updatedAt
    }
  }
`;

export const SINGLE_ORDER_QUERY = gql`
  query GetSingleOrder($_id: ID!) {
    getSingleOrder(_id: $_id) {
      _id
      orderTotal
      orderSubTotal
      orderTax
      createdAt
      updatedAt
      orderItems {
        productId
        quantity
        price
        brand
        model
        image
      }
    }
  }
`;
