// in src/Cats.js
import React from 'react';
import { Filter, List, Edit, Create, Datagrid, EmailField, ReferenceField, TextField, DeleteButton, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, ImageField, DateField, TextInput, DateInput, EmailInput } from 'react-admin';

const CatFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn />
    </Filter>
);

const CatName = ({ record }) => {
    return <span>Cat {record ? `"${record.name}"` : ''}</span>;
};

export const CatEdit = (props) => (
    <Edit title={<CatName />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="colour" />
        </SimpleForm>
    </Edit>
);

export const CatCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="colour" />
        </SimpleForm>
    </Create>
);

export const CatList = (props) => (
    <List title="All Cats" {...props} filters={<CatFilter/>}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" sortable={false} />
            <TextField source="colour" sortable={false} />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);