import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from "./users/Users";
import { GroupsList } from "./groups/Groups";

import CustomLayout from "../components/CustomLayout";
import authProvider from "./providers/authProvider";

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
import { dataProvider } from "./providers/dataProvider";

const App = () => (
  <Admin authProvider={authProvider}  dataProvider={dataProvider} layout={CustomLayout} >
    <Resource name="users" list={UserList} />
    {/* <Resource name="groups" list={GroupsList} /> */}
    {/* <Resource name="posts" list={ListGuesser} /> */}
  </Admin>
);

export default App;
