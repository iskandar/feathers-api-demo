// in src/posts.js
import React from 'react';
import { Filter, List, Edit, Create, Datagrid, EmailField, ReferenceField, TextField, DeleteButton, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput, EmailInput } from 'react-admin';

const LeadFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn />
    </Filter>
);

const LeadTitle = ({ record }) => {
    return <span>Lead {record ? `"${record.title}"` : ''}</span>;
};

export const LeadEdit = (props) => (
    <Edit title={<LeadTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="created" />
            <TextInput source="submitter" />
            <TextInput source="title" />
            <LongTextInput source="summary" />
        </SimpleForm>
    </Edit>
);

export const LeadCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="submitter" />
            <TextInput source="title" />
            <LongTextInput source="summary" />
        </SimpleForm>
    </Create>
);

export const LeadList = (props) => (
    <List title="All leads" {...props} filters={<LeadFilter />}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="created" />
            <TextField source="submitter" sortable={false} />
            <TextField source="title"sortable={false} />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);