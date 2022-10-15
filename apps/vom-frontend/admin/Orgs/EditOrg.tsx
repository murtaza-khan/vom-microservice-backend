import { Edit, SimpleForm, TextInput } from 'react-admin';

export const OrganizationEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="address" />
            <TextInput source="logo" />
            <TextInput source="bn" />

        </SimpleForm>
    </Edit>
);