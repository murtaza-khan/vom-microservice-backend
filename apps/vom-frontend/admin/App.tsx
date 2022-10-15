import * as React from "react";
import { Admin, Resource } from 'react-admin';

import { UserList } from "./users/Users";
import { CreateUser } from "./users/CreateUser";
import { GroupsList } from "./groups/Groups";
import { OrganizationEdit } from "./Orgs/EditOrg";
import { GroupsEdit } from "./groups/UpdateGroups";
import { CreateGroup } from "./groups/CreateGroups";

import CustomLayout from "../components/CustomLayout";
import authProvider from "./providers/authProvider";
import { userEdit } from "./users/UpdateUser";
import { dataProvider } from "./providers/dataProvider";
import { orgList } from "./Orgs/orgsList";
import { CreateOrg } from "./Orgs/CreateOrg";

import { getUserRole, UserRoles } from '../utils/utils';
const userRole = getUserRole();

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} layout={CustomLayout} >
    <Resource name="users"  list={UserList} edit={userEdit}  create={CreateUser} />
    {
      userRole === UserRoles.AFFLIATE ?
        <Resource name="organizations"  list={orgList} edit={OrganizationEdit} create={CreateOrg} />
        : null
    }

    {
      (userRole === UserRoles.ADMIN || userRole === UserRoles.GROUP_MANAGER) ?
        <Resource name="groups" list={GroupsList} edit={GroupsEdit} create={CreateGroup}/>
        : null
    }

  </Admin>
);

export default App;
