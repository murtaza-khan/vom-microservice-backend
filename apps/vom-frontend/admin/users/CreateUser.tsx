import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectField,
  SelectInput,
  List,
  TextField,
  Datagrid
} from 'react-admin';
import { Box } from '@mui/material';
import { dataOrg } from './../providers/dataProvider';
// For Create New User Form
const basicauth=JSON.parse(localStorage.getItem('loginUser'));
const ad="admin";
const gm="group_manager";
const af="affliate";
const em="employee";
export const CreateUser = (props) => {

  const organizationData: any = [
      { id: '6349551ec60e820678851c66', name: 'techmania 1' },
      { id: '63495530c60e820678851c6b', name: 'techmania 2' },
      { id: '63495547c60e820678851c79', name: 'techmania 3' },
      { id: '634957b2c60e820678851c84', name: 'techmania 4' },
  ];
  return (
   <>
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
                {
                    checkLoggedIn === sup?<TextInput source="userRole" defaultValue="affliate" disabled fullWidth />
                    :checkLoggedIn === af?<TextInput source="userRole" defaultValue="admin" disabled fullWidth />
                    :checkLoggedIn === ad?<SelectInput source="userRole" choices={[
                                { id: 'group_manager', name: 'Group Manager' },
                                { id: 'employee', name: 'Employee',},
                            ]} fullWidth />
                    :checkLoggedIn === gm?<TextInput source="userRole" defaultValue="employee" disabled fullWidth />
                    :null


                }
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
              <TextInput type="password" source="password" isRequired fullWidth />
            </Box>
          </Box>
          {
            checkLoggedIn === af?<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
              <SelectInput source="companies" choices={organizationData} fullWidth />
            </Box>
            :null
          }

        </SimpleForm>
      </>
    </Create>

   </>
  );
};
