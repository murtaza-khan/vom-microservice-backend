import * as React from "react";
import { Datagrid, EmailField, List, TextField,TopToolbar,EditButton,DeleteButton } from 'react-admin';

export const ListActions = (props)=> {
  const { className, basePath } = props;
  return (
    <TopToolbar className={className}>
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
            <TextField source="organizationId" />
            <TextField source="managerId" />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);
