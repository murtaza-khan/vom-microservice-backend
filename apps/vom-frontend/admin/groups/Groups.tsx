import * as React from "react";
import { Datagrid, List, TextField,TopToolbar,EditButton,DeleteButton, CreateButton } from 'react-admin';
import { getUserRole, UserRoles } from '../../utils/utils';
const userRole = getUserRole();

export const ListActions = (props)=> {
  const { className, basePath } = props;
  return (
    <TopToolbar className={className}>
      {userRole === UserRoles.ADMIN ? <CreateButton {...props} /> : null}
      <DeleteButton {...props} />
      <EditButton {...props} />
    </TopToolbar>
  );
};
export const GroupsList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="managerId" />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);
