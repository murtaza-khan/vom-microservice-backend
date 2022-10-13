import {
    SimpleForm,
    TextInput,
    SelectField,
    Edit
  } from 'react-admin';
  import { Box } from '@mui/material';


export const userEdit=(props)=>(
    <Edit>
      <SimpleForm sx={{ maxWidth: 500 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <TextInput disabled source="id" fullWidth />
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
           <TextInput source="firstName" fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
           <TextInput source="lastName" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
           <TextInput source="phone" fullWidth/>
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
           <TextInput source="email" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <TextInput source="userRole" fullWidth/>
      </Box>

      </SimpleForm>
    </Edit>
  );
