import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const apiUrl = "http://localhost:3003/graphql";

const getToken = () => {
  const token = localStorage.getItem('loginUser') ? JSON.parse(localStorage.getItem('loginUser')).token : null;
  return "Bearer " + token;
}

const client = new ApolloClient({

    uri: apiUrl,
    headers: { "x-graphql-token": "YYY", Authorization: getToken() },
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
        return await client
            .query({
                query: gql`
          query{
            getUser{
              id
              firstName
              lastName
              phone
              groupId
              userRole

            }
          }`,
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
        .then(async (result) => ({
            data: await (result.data.getUser),
            total: result.data.getUser.length
        }))
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
     create: async (resource, params) => {
        return await client
          .mutate({
            mutation: gql`
              mutation createUser($userData: CreateUser!) {
                createUser(createUser: $userData) {
                  id
                  firstName
                  lastName
                  email
                  userRole
                }
              }
            `,
            variables: {
              userData: {
                firstName: params.data.firstName,
                lastName: params.data.lastName,
                email: params.data.email,
                password: params.data.password,
                phone: params.data.phone,
                userRole: params.data.userRole
              },
            },
          })
          .then(async result => ({
            data: await result.data.createUser,
          }));
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
        return await client
          .mutate({
            mutation: gql`
              mutation deleteUserById($id:String!){
              deleteUserById(userId:$id){
                firstName
              }

            }`,
            variables: {
                 id: params.id,
            },
          })
          .then(async result => ({
            data: await result.data
          }));
      },
      // Update User provider
      update: async (resource, params) => {
        return await client
          .mutate({
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
            variables: {
              id: params.data.id,
              userEditD: {
                firstName: params.data.firstName,
                lastName: params.data.lastName,
                email: params.data.email,
                password: params.data.password,
                phone: params.data.phone,
              },
            },
          })
          .then(async result => ({
            data: await result.data,
          }));
      },
      // Get one for update Provider
      getOne: async (resource, params) => {
        console.log(params)
        return await client.query({
            query: gql`
            query getUser($id:String){
                getUser(userId:$id){
                  id
                  firstName
                  lastName
                  phone
                  userRole
                }
              }`,
            variables: {
                  id: params.id,
            },
          }).then(result=>({
              data:params
          }))
        },

}
