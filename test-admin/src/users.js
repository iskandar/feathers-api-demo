// in src/users.js
import React from 'react';
import { Filter, List, Edit, Create, Datagrid, EmailField, ReferenceField, TextField, DeleteButton, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, ImageField, DateField, TextInput, DateInput, EmailInput } from 'react-admin';

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Email" source="email" alwaysOn />
        <TextInput label="Username" source="username" alwaysOn />
    </Filter>
);

const UserName = ({ record }) => {
    return <span>User {record ? `"${record.username}"` : ''}</span>;
};

export const UserEdit = (props) => (
    <Edit title={<UserName />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DateInput source="created" />
            <TextInput source="avatarUrl" />
            <TextInput source="username" />
            <TextInput source="email" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <DateInput source="created" />
            <TextInput source="avatarUrl" />
            <TextInput source="username" />
            <TextInput source="email" />
        </SimpleForm>
    </Create>
);

export const UserList = (props) => (
    <List title="All users" {...props} filters={<UserFilter/>}>
        <Datagrid>
            <ImageField source="avatarUrl" sortable={false} />
            <DateField source="created" />
            <TextField source="id" />
            <TextField source="username" sortable={false} />
            <EmailField source="email" sortable={false} />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);