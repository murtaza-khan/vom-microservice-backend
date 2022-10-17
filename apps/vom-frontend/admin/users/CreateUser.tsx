import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
} from 'react-admin';
import { Box } from '@mui/material';
import { listData } from './../providers/dataProvider';

import { getUserRole, UserRoles } from '../../utils/utils';

const userRole = getUserRole();


console.log("userROLE,====",userRole)

export const CreateUser = (props) => {

  const [organizationData, setOrganizationData]: any = React.useState([]);
  React.useEffect(() => {
    if(userRole === UserRoles.AFFLIATE){
      listData.getOrganizations('633975b911d7bb7e640a1f52').then((data)=>{

        setOrganizationData(data);
      });
    }
  }, []);

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
                    userRole === UserRoles.SUPER_ADMIN?<TextInput source="userRole" defaultValue="affliate" disabled fullWidth />
                    :userRole === UserRoles.AFFLIATE?<TextInput source="userRole" defaultValue="admin" disabled fullWidth />
                    :userRole === UserRoles.ADMIN?<SelectInput source="userRole" choices={[
                                { id: 'group_manager', name: 'Group Manager' },
                                { id: 'employee', name: 'Employee',},
                            ]} fullWidth />
                    :userRole === UserRoles.GROUP_MANAGER?<TextInput source="userRole" defaultValue="employee" disabled fullWidth />
                    :<TextInput source="userRole" defaultValue="admin" disabled fullWidth />

/// change required wrong iff condition







                }
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
              <TextInput type="password" source="password" isRequired fullWidth />
            </Box>
          </Box>
          {
            userRole === UserRoles.AFFLIATE?<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <SelectInput source="organization" choices={organizationData} fullWidth />
            </Box>
            :null
          }

        </SimpleForm>
      </>
    </Create>

   </>
  );
};
