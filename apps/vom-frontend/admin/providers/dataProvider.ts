import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const apiUrl = "http://localhost:3003/graphql";

const client = new ApolloClient({

    uri: apiUrl,
    headers: { "x-graphql-token": "YYY", Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlciIsImlhdCI6MTY2NTUxMTg5MiwiZXhwIjoxNjY1NTU1MDkyfQ.UJwD-LmOBMLLQt9LDEjBFTCyCxZcUun2zm5Vf1OLmQA' },
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
            total: 3
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
    }
}