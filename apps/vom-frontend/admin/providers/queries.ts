import { gql } from "@apollo/client";

export const GET_LIST_USERS = {
  query: gql`
query{
  getUser{
    id
    firstName
    lastName
    email    
    phone
    groupId
    userRole
  }
}`,
};

export const GET_LIST_ORGS = {
  query: gql`query{
    getOrgs{
      id
      name
      address
      logo
      createdAt
    }
  }`,
};

export const CREATE_USER = {
  mutation: gql`mutation createUser($userData: CreateUser!) {
        createUser(createUser: $userData) {
          id
          firstName
          lastName
          email
          userRole
        }
      }
    `,
};

export const CREATE_ORG = {
  mutation: gql`mutation createOrg($oData:OrgInput!){
    createOrg(orgData:$oData){
      id
      name
      
    }
  }`,
};

export const EDIT_USER = {
  mutation: gql`
    mutation editUser($id: String!, $userEditD: UpdateUser!) {
      editUser(id: $id, user: $userEditD) {
          id
        firstName
        lastName
        email
        phone
        userRole
      }
    }
  `,
};

export const EDIT_ORG = {
  mutation: gql`mutation editOrg($oData:UpdateOrgInput!){
    editOrg(orgData:$oData){
      name
      BN
      logo
      
  
    }
    
  }`,
};

export const GET_USER_BY_ID = {
  query: gql`
  query getUser($id:String){
      getUser(userId:$id){
        id
        firstName
        lastName
        email
        phone
        userRole
      }
    }`,
};

export const GET_ORG_BY_ID = {
  query: gql`
  query getOrgs($o_id:String){
    getOrgs(orgId:$o_id){
      id
      name
      address
      logo
      createdAt
    }
  }`,
};

export const DELETE_USER = {
  mutation: gql`
        mutation deleteUserById($id:String!){
        deleteUserById(userId:$id){
          firstName
        }

      }`,
};

export const DELETE_ORG = {
  mutation: gql`
  mutation deleteOrgById($id:String!)
{
  deleteOrgById(orgId:$id)
}`,
};

