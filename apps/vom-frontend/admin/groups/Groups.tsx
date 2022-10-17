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
export const GroupsList = (props) => (
    <List  {...props}  actions={<ListActions />}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="manager.id" />
            <TextField source="manager.firstName" />
            <TextField source="manager.lastName" />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);
