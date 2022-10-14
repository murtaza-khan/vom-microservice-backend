import * as React from "react";
import { Admin, EditGuesser, Resource } from 'react-admin';

import { UserList } from "./users/Users";
import { CreateUser } from "./users/CreateUser";
import { GroupsList } from "./groups/Groups";
import { OrganizationEdit } from "./providers/Orgs/EditOrg";

import CustomLayout from "../components/CustomLayout";
import authProvider from "./providers/authProvider";
import { userEdit } from "./users/UpdateUser";
import { dataProvider } from "./providers/dataProvider";
import { orgList } from "./providers/Orgs/orgsList";
import { CreateOrg } from "./Orgs/CreateOrg";

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} layout={CustomLayout} >
    <Resource name="users"  list={UserList} edit={userEdit}  create={CreateUser} />
    <Resource name="organizations"  list={orgList} edit={OrganizationEdit} create={CreateOrg} />
    {/* <Resource name="groups" list={GroupsList} /> */}
    {/* <Resource name="posts" list={ListGuesser} /> */}
  </Admin>
);

export default App;
