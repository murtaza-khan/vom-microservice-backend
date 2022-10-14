import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const GET_LIST_USERS = { query: gql`
query{
  getUser{
    id
    firstName
    lastName         
    phone
    groupId
    userRole
  }
}`};

const GET_LIST_ORGS={query: gql`query{
    getOrgs{
      id
      name
      address
      logo
      createdAt
    }
  }`};

  const CREATE_USER={
    mutation: gql`mutation createUser($userData: CreateUser!) {
        createUser(createUser: $userData) {
          id
          firstName
          lastName
          email
          userRole
        }
      }
    `}


 const CREATE_ORG={
  mutation: gql`mutation createOrg($oData:OrgInput!){
    createOrg(orgData:$oData){
      id
      name
      
    }
  }`

 }
const EDIT_USER={
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
  `}
const EDIT_ORG={
  mutation: gql`mutation editOrg($oData:UpdateOrgInput!){
    editOrg(orgData:$oData){
      name
      BN
      logo
      
  
    }
    
  }`

}
const GET_USER_BY_ID={
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
    }`
}

const GET_ORG_BY_ID={
  query: gql`
  query getOrgs($o_id:String){
    getOrgs(orgId:$o_id){
      id
      name
      address
      logo
      createdAt
    }
  }`}

  const DELETE_USER={
    
      mutation: gql`
        mutation deleteUserById($id:String!){
        deleteUserById(userId:$id){
          firstName
        }

      }`
  }

const DELETE_ORG={
  mutation: gql`
  mutation deleteOrgById($id:String!)
{
  deleteOrgById(orgId:$id)
}`

}

 module.exports={
  GET_LIST_ORGS,
  GET_LIST_USERS,
  CREATE_ORG,
  CREATE_USER,
  EDIT_ORG,
  EDIT_USER,
  GET_ORG_BY_ID,
  GET_USER_BY_ID,
  DELETE_USER,
  DELETE_ORG

}