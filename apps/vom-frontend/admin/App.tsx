import * as React from "react";
import { Admin, Resource } from 'react-admin';

import { UserList ,userCreate } from "./users/Users";
import { GroupsList } from "./groups/Groups";

import CustomLayout from "../components/CustomLayout";
import authProvider from "./providers/authProvider";

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
import { dataProvider } from "./providers/dataProvider";

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} layout={CustomLayout} >
    <Resource name="users" list={UserList} create={userCreate} />
    {/* <Resource name="groups" list={GroupsList} /> */}
    {/* <Resource name="posts" list={ListGuesser} /> */}
  </Admin>
);

export default App;
