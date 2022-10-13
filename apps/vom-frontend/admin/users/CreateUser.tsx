import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectField,
  SelectInput
} from 'react-admin';
import { Box } from '@mui/material';

// For Create New User Form
export const CreateUser = props => {

  return (
    <Create {...props}>
      <>
        <SimpleForm sx={{ maxWidth: 500 }}>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <TextInput source="firstName" isRequired fullWidth />
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
              <TextInput source="lastName" isRequired fullWidth />
            </Box>
          </Box>

          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <TextInput type="email" source="email" isRequired fullWidth />
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
              <TextInput source="phone" isRequired fullWidth />
            </Box>
          </Box>

          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
             <SelectInput source="userRole" choices={[
                  { id: 'affliate', name: 'Affliate' },
                  { id: 'admin', name: 'Admin' },
                  { id: 'group_manager', name: 'Group Manager' },
                  { id: 'employee', name: 'Employee' },
              ]} fullWidth />
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
              <TextInput type="password" source="password" isRequired fullWidth />
            </Box>
          </Box>

        </SimpleForm>
      </>
    </Create>
  );
};
