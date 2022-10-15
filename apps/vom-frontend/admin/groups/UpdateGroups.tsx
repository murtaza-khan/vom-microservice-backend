import {
    SimpleForm,
    TextInput,
    Edit
  } from 'react-admin';
  import { Box } from '@mui/material';


export const GroupsEdit=(props)=>(
    <Edit>
      <SimpleForm sx={{ maxWidth: 500 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <TextInput disabled source="id" fullWidth />
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <TextInput source="name" fullWidth />
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <TextInput source="managerId" fullWidth />
      </Box>

      </SimpleForm>
    </Edit>
  );
