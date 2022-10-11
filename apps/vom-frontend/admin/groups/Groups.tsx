import * as React from "react";
import { Datagrid, EmailField, List, TextField } from 'react-admin';

export const GroupsList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="organizationId" />            
            <TextField source="managerId" />
        </Datagrid>
    </List>
);