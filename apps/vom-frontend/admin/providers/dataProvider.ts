import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
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
  DELETE_ORG
} from './Data/Queries';
import { resourceLimits } from 'worker_threads';

const apiUrl = "http://localhost:3003/graphql";


const getToken = () => {
  const token = localStorage.getItem('loginUser') ? JSON.parse(localStorage.getItem('loginUser')).token : null;
  console.log(token);
  return "Bearer " + token;

}
const client = new ApolloClient({

    uri: apiUrl,
    headers: { "x-graphql-token": "YYY", Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFmZkBnbWFpbC5jb20iLCJyb2xlIjoiYWZmbGlhdGUiLCJpYXQiOjE2NjU3NjI5MjQsImV4cCI6MTY2NTgwNjEyNH0.CUBXemm4d2ENJ3R4KMLGpNaAYB_T6RYYcv8mhRexWBM" },
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

export const dataProvider =
{
    getList: async (resource, { sort, pagination, filter }) => {
        const { field, order } = sort;
        const { page, perPage } = pagination;
        let qry: any = {};
        
        if(resource === "users"){
          qry = GET_LIST_USERS;
        }else{
          qry = GET_LIST_ORGS;
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
      if(result.errors){
        throw new Error(result.errors[0].message);
      }else{
        if(resource === "users"){
          return {
            data: await (result.data.getUser),
            total:10
          }
        }else{
          return {
            data: await (result.data.getOrgs),
            total:10
          } 
        }
      }  
  }).catch(error => {
    debugger;
    throw new Error(error);
  })
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
                    password: params.password
                }
            })
            .then(async (result) => ({
                data: await result.data.login,
            }
            ));
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
      let variable:any={};
      if(resource === "users"){
        query = CREATE_USER;
       variable ={ userData: {
                      firstName: params.data.firstName,
                      lastName: params.data.lastName,
                      email: params.data.email,
                      password: params.data.password,
                      phone: params.data.phone,
                      userRole: params.data.userRole
                    },

        }
      }
      else if (resource === "organizations"){
        query = CREATE_ORG;
        variable={ oData: {
          name: params.data.name,
          address: params.data.address,
          logo:params.data.logo,
          BN: params.data.BN
       
        }

        }

      }

      return await client
        .mutate({
          ...query,
          

      variables: {...variable  },
  })
  .then(async (result) => {
    if(result.errors){
      throw new Error(result.errors[0].message);
    }else{
      if(resource === "users"){
        return {
          data: await (result.data.createUser),
     
        }
      }else{
        return {
          data: await (result.data.createOrg),

        } 
      }
    }  
}).catch(error => {
  debugger;
  throw new Error(error);
})
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
            .then(async result => ({
              data: await result.data.create,
            }));
        },
        // Delete user Provider
       delete: async (resource, params) => {
        let query: any = {};
        let variable:any={};
        if(resource === "users"){
          query = DELETE_USER
         variable ={ id:params.id}
  
          }
        
        else if (resource === "organizations"){
          query = DELETE_ORG;
          variable={ id:params.id }
  
        }
  
        return await client
          .mutate({
            ...query,
            
  
        variables: {...variable  },
    })
    .then(async (result) => {
      if(result.errors){
        throw new Error(result.errors[0].message);
      }else{
        if(resource === "users"){
          return {
            data: await (result.data),
       
          }
        }else{
          return {
            data: await (result.data),
  
          } 
        }
      }  
  }).catch(error => {
    debugger;
    throw new Error(error);
  })
  },
      // Update User provider
      update: async (resource, params) => {
        let query: any = {};
        let variable:any={};
        if(resource === "users"){
          query = EDIT_USER,
          variable= {
            id: params.data.id,
            userEditD: {
              firstName: params.data.firstName,
              lastName: params.data.lastName,
              email: params.data.email,
              password: params.data.password,
              phone: params.data.phone,
            },
  
          }
        }
        else if (resource === "organizations"){
          query = EDIT_ORG;
          variable={ oData: {
            id:params.data.id,
            name: params.data.name,

       
            logo:params.data.logo,
            BN: params.data.BN
         
          }
  
          }
  
        }
  
        return await client
          .mutate({
            ...query,
            
  
        variables: {...variable  },
    })
    .then(async (result) => {
      if(result.errors){
        throw new Error(result.errors[0].message);
      }else{
        if(resource === "users"){
          return {
            data: await (result.data.editUser[0]),
       
          }
        }else{
          return {
            data: await (result.data.editOrg[0]),
  
          } 
        }
      }  
  }).catch(error => {
    debugger;
    throw new Error(error);
  })
  },
      // Get one for update Provider
      getOne: async (resource, params) => {
        let query: any = {};
        let variable:any={};
        if(resource === "users")
        {
          query = GET_USER_BY_ID,
          variable= {
                id: params.id,
           
            }
  
          }
        
        else if (resource === "organizations")
        {
          query = GET_ORG_BY_ID,
          variable={ 
            o_id: params.id,
          }
  
          }
  
        return await client
          .query({
            ...query,
            
  
        variables: {...variable  },
    })
    .then(async (result) => {
      if(result.errors){
        throw new Error(result.errors[0].message);
      }else{
        if(resource === "users"){
          return {
            data: await (result.data.getUser[0]),
       
          }
        }else{
          return {
            data: await (result.data.getOrgs[0]),
  
          } 
        }
      }  
  }).catch(error => {
    debugger;
    throw new Error(error);
  })
  },




}

export const dataOrg ={
  // Get Organizations By Affiliated
      getOrganizations: async () => {
        return await client
            .query({
                query: gql`
              query getOrgsByAffiliateId($affiliateId : String!= "63454d507614684220f7e790" ){
              getOrgsByAffiliateId(affiliateId:$affiliateId){
              id
              name
              }`
        })
        .then(async (result) => ({
                data: await result.data,
            }
          ));
    },
}
