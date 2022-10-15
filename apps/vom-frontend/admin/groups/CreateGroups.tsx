import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
} from 'react-admin';
import { Box } from '@mui/material';

export const CreateUser = (props) => {

  return (
   <>
    <Create {...props}>
      <>
        <SimpleForm sx={{ maxWidth: 500 }}>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
           <TextInput source="name" isRequired fullWidth />
          </Box>

          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <TextInput source="managerId" isRequired fullWidth />
          </Box>

        </SimpleForm>
      </>
    </Create>

   </>
  );
};
