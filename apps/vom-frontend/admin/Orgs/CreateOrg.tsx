import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectField,
  SelectInput
} from 'react-admin';
import { Box } from '@mui/material';

export const CreateOrg = (props) => {

  return (
    <Create {...props}>
      <>
        <SimpleForm sx={{ maxWidth: 500 }}>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <TextInput source="name" isRequired fullWidth />
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
              <TextInput source="address" isRequired fullWidth />
            </Box>
          </Box>

          <Box display={{ xs: 'logo', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <TextInput type="email" source="email" isRequired fullWidth />
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
              <TextInput source="logo" isRequired fullWidth />
            </Box>
 



          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
              <TextInput source="BN" isRequired fullWidth />
            </Box>
          </Box>
        

        </SimpleForm>
      </>
    </Create>
  );
};
