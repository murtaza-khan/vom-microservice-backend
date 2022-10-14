import * as React from "react";
import { Datagrid,
  List,
  TextField,
  TopToolbar,
  CreateButton,
  ExportButton,
  DeleteButton,
  EditButton,
 } from 'react-admin';
import { ImportButton } from "react-admin-import-csv";
const basicauth=JSON.parse(localStorage.getItem('loginUser'));
const ad="admin";
const gm="group_manager";
const af="affliate";
const em="employee";
// User File Import
export const ListActions = (props)=> {
  const { className, basePath } = props;
  return (
    <TopToolbar className={className}>
      {/* <CreateButton {...props} /> */}
      {basicauth.role === ad || basicauth.role ===gm || basicauth.role ===af ?<CreateButton {...props} />:null}
      <ExportButton {...props} />
      <ImportButton {...props} />
      <DeleteButton {...props} />
      <EditButton {...props} />
    </TopToolbar>
  );
};

// User List
export const UserList = (props) => (
    <List {...props}  actions={<ListActions />} >
        <Datagrid bulkActionButtons={false}>
            <TextField source="id" />
            <TextField source="firstName" />
            {/* <TextField source="username" /> */}
              <TextField source="lastName" />
              <TextField source="email" />
            {/* <TextField source="address.street" /> */}
            <TextField source="phone" />
            {/* <TextField source="website" /> */}
            <TextField source="groupId" />
            <TextField source="userRole" />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);
