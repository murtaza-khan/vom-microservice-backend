import * as React from "react";
import { Datagrid,
  List,
  TextField,
  TopToolbar,
  CreateButton,
  ExportButton,
 } from 'react-admin';
import { ImportButton } from "react-admin-import-csv";

// User File Import
export const ListActions = (props)=> {
  const { className, basePath } = props;
  return (
    <TopToolbar className={className}>
      <CreateButton basePath={basePath} />
      <ExportButton basePath={basePath} />
      <ImportButton {...props} />
    </TopToolbar>
  );
};

// User List
export const UserList = (props) => (
    <List {...props} actions={<ListActions />} >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="firstName" />
            {/* <TextField source="username" /> */}
            <TextField source="lastName" />
            {/* <TextField source="address.street" /> */}
            <TextField source="phone" />
            {/* <TextField source="website" /> */}
            <TextField source="groupId" />
            <TextField source="userRole" />
        </Datagrid>
    </List>
);
