import * as React from "react";
import {
  Create,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import { Box } from '@mui/material';
import { listData } from './../providers/dataProvider';

export const CreateGroup = (props) => {

  const [managers, setManagers]: any = React.useState([]);
  React.useEffect(() => {
      listData.getManagers().then((data) => {
        setManagers(data);
      });
  }, []);

  return (
   <>
    <Create {...props}>
      <>
        <SimpleForm sx={{ maxWidth: 500 }}>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
           <TextInput source="name" isRequired fullWidth />
          </Box>

          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
              <SelectInput source="manager" choices={managers} fullWidth />
          </Box>

        </SimpleForm>
      </>
    </Create>

   </>
  );
};
