import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import {
  GET_LIST_ORGS,
  GET_LIST_USERS,
  CREATE_ORG,
  CREATE_USER,
  EDIT_ORG,
  EDIT_USER,
  GET_ORG_BY_ID,
  GET_USER_BY_ID,
  DELETE_USER,
  DELETE_ORG,
  GET_LIST_GROUPS,
  CREATE_GROUPS,
  DELETE_GROUPS,
  EDIT_GROUPS,
  GET_GRP_BY_ID,
} from "./queries";

const httpLink = createHttpLink({
  uri: process.env.API_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,

    },
  };
});

const getToken = () => {
  const token = localStorage.getItem(process.env.authUser)
    ? JSON.parse(localStorage.getItem(process.env.authUser)).token
    : null;
  return token;
};

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});

export const dataProvider = {
  getList: async (resource, { sort, pagination, filter }) => {
    const { field, order } = sort;
    const { page, perPage } = pagination;
    let qry: any = {};

    if (resource === "users") {
      qry = GET_LIST_USERS;
    } else if (resource === "organizations" ){
      qry = GET_LIST_ORGS;
    } else if(resource === "groups"){
      qry = GET_LIST_GROUPS;
    }

    return await client
      .query({
        ...qry,
        variables: {
          limit: perPage,
          offset: (page - 1) * perPage,
          order_by: { [field]: order.toLowerCase() },
          where: Object.keys(filter).reduce(
            (prev, key) => ({
              ...prev,
              [key]: { _eq: filter[key] },
            }),
            {}
          ),
        },
      })
      .then(async (result) => {
        if (result.errors) {
          throw new Error(result.errors[0].message);
        } else {
          if (resource === "users") {
            return {
              data: await result.data.getUser,
              total: 10,
            };
          } else if (resource === "organizations"){
            return {
              data: await result.data.getOrgs,
              total: 10,
            };
          }else if (resource === "groups"){
            return {
              data: await result.data.groups,
              total: 10,
            };
          }
        }
      })
      .catch((error) => {

        throw new Error(error);
      });
  },
  login: async (params: any) => {
    return await client
      .mutate({
        mutation: gql`
              mutation ($email: Email!, $password:String!)
              {
                login(email:$email,password:$password)
                {
                  email
                  token
                  role
                }
              }`,
        variables: {
          email: params.email,
          password: params.password,
        },
      })
      .then(async (result) => ({
        data: await result.data.login,
      }));
  },
  checkToken: async (params: any) => {
    return await client
      .query({
        query: gql`
        query{
          validToken
        }`
      })
      .then(async (result) => ({
        data: await result.data.validToken,
      })).catch((error) => {
        throw new Error(error);
      });
  },
  // For Create New User Provider
  //  create: async (resource, params) => {
  //     return await client
  //       .mutate({
  //         mutation: gql`
  //           mutation createUser($userData: CreateUser!) {
  //             createUser(createUser: $userData) {
  //               id
  //               firstName
  //               lastName
  //               email
  //               userRole
  //             }
  //           }
  //         `,
  //         variables: {
  //           userData: {
  //             firstName: params.data.firstName,
  //             lastName: params.data.lastName,
  //             email: params.data.email,
  //             password: params.data.password,
  //             phone: params.data.phone,
  //             userRole: params.data.userRole
  //           },
  //         },
  //       })
  //       .then(async result => ({
  //         data: await result.data.createUser,
  //       }));
  //   },

  create: async (resource, params) => {
    let query: any = {};
    let variable: any = {};
    if (resource === "users") {
      query = CREATE_USER;
      variable = {
        userData: {
          firstName: params.data.firstName,
          lastName: params.data.lastName,
          email: params.data.email,
          password: params.data.password,
          phone: params.data.phone,
          userRole: params.data.userRole,
          organization: params.data.organization
        },
      };
    } else if (resource === "organizations") {
      query = CREATE_ORG;
      variable = {
        oData: {
          name: params.data.name,
          address: params.data.address,
          logo: params.data.logo,
          BN: params.data.BN,
        },
      };
    }else if (resource === "groups"){
      query = CREATE_GROUPS;
      variable ={
        gd: {
          name: params.data.name,
          managerId: params.data.manager
        },
      }
    }

    return await client
      .mutate({
        ...query,

        variables: { ...variable },
      })
      .then(async (result) => {
        if (result.errors) {
          throw new Error(result.errors[0].message);
        } else {
          if (resource === "users") {
            return {
              data: await result.data.createUser,
            };
          } else if(resource === "organizations"){
            return{
              data: await result.data.createOrg,
            };
          }else if(resource === "groups"){
            return{
              data: await result.data.createGroup,
            };
          }
        }
      })
      .catch((error) => {

        throw new Error(error);
      });
  },

  // Import CSV File  User Provider
  createUserFromCSV: async (resource, params) => {
    return await client
      .mutate({
        mutation: gql`
                mutation createUserFromCSV($csv:csvFile){
                  createUserFromCSV(csvFile:$csv){
                }

                }
              `,
        variables: {
          csv: params.body,
        },
      })
      .then(async (result) => ({
        data: await result.data.create,
      }));
  },
  // Delete user/organizations
  delete: async (resource, params) => {
    let query: any = {};
    let variable: any = {};
    if (resource === "users") {
      query = DELETE_USER;
      variable = { id: params.id };
    } else if (resource === "organizations") {
      query = DELETE_ORG;
      variable = { id: params.id };
    }else if(resource === "groups"){
      query = DELETE_GROUPS;
      variable = { groupID: params.id };
    }

    return await client
      .mutate({
        ...query,

        variables: { ...variable },
      })
      .then(async (result) => {
        if (result.errors) {
          throw new Error(result.errors[0].message);
        } else {
          if (resource === "users") {
            return {
              data: await result.data,
            };
          } else if(resource === "organizations") {
            return {
              data: await result.data,
            };
          }else if(resource === "groups"){
            return {
              data: await result.data,
            };
          }
        }
      })
      .catch((error) => {
        debugger;
        throw new Error(error);
      });
  },
  // Update User provider
  update: async (resource, params) => {
    let query: any = {};
    let variable: any = {};
    if (resource === "users") {
      query = EDIT_USER;
        variable = {
          id: params.data.id,
          userEditD: {
            firstName: params.data.firstName,
            lastName: params.data.lastName,
            email: params.data.email,
            password: params.data.password,
            phone: params.data.phone,
          },
        };
    } else if (resource === "organizations") {
      query = EDIT_ORG;
      variable = {
        oData: {
          id: params.data.id,
          name: params.data.name,
          address: params.data.address,
          logo: params.data.logo,
          BN: params.data.BN,
        },
      };
    } else if(resource === "groups"){
      query = EDIT_GROUPS;
      variable = {
        gDataUp: {
          id: params.data.id,
        name: params.data.name


        },
    };

    return await client
      .mutate({
        ...query,

        variables: { ...variable },
      })
      .then(async (result) => {
        if (result.errors) {
          throw new Error(result.errors[0].message);
        } else {
          if (resource === "users") {
            return {
              data: await result.data.editUser[0],
            };
          } else if(resource === "organizations") {
            return {
              data: await result.data.editOrg[0],
            };
          } else if(resource === "groups"){
            return {
              data: await result.data.updateGroup[0],
            };
          }
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
    }
  },
  // Get one for update Provider
  getOne: async (resource, params) => {
    let query: any = {};
    let variable: any = {};
    if (resource === "users") {
      (query = GET_USER_BY_ID);
        (variable = {
          id: params.id,
        });
    } else if (resource === "organizations") {
      (query = GET_ORG_BY_ID);
        (variable = {
          o_id: params.id,
        });
    }
    else if (resource === "groups") {
      (query = GET_GRP_BY_ID);
        (variable = {
          groupId: params.id,
        });
    }

    return await client
      .query({
        ...query,

        variables: { ...variable },
      })
      .then(async (result) => {
        if (result.errors) {
          throw new Error(result.errors[0].message);
        } else {
          if (resource === "users") {
            return {
              data: await result.data.getUser[0],
            };
          } else if (resource === "organizations") {
            return {
              data: await result.data.getOrgs[0],
            };
          }
          else if (resource === "groups") {
            return {
              data: await result.data.groups[0]
            };
          }}
      })
      .catch((error) => {

        throw new Error(error);
      });
  },
};

export const listData = {

  // Get Organizations By Affiliated
  getOrganizations: async (affiliateId) => {
    return await client
      .query({
        query: gql`
        query{
        getOrgsByAffiliateId{
                id
                name
              }}`,
      })
      .then(async (result) => {
        let data = await result.data.getOrgsByAffiliateId;
        let response = data.map((i: any)=>{return{id: i.id, name: i.name}});
        return response;
    });
  },

  getManagers: async () => {
    return await client
      .query({
        query: gql`
        query{
  getManagersByOrgID{
    id
    firstName
    lastName
  }
}`})
      .then(async (result) => {
        let data = await result.data.getManagersByOrgID;
        let response = data.map((i: any) => {
          return {
            id: i.id, name: i.firstName + " " + i.lastName
          }
        });
        return response;
      });
  }
};
