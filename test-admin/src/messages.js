// in src/posts.js
import React from 'react';
import { Filter, List, Edit, Create, Datagrid, EmailField, ReferenceField, TextField, DeleteButton, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput, EmailInput, DateField, DateInput } from 'react-admin';

const MessageFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="text" alwaysOn />
    </Filter>
);

const MessageTitle = ({ record }) => {
    return <span>Message {record ? `"${record.id}"` : ''}</span>;
};

export const MessageEdit = (props) => (
    <Edit title={<MessageTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DateInput source="created" />
            <TextInput source="submitter" />
            <LongTextInput source="text" />
        </SimpleForm>
    </Edit>
);

export const MessageCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <DateInput source="created" />
            <TextInput source="submitter" />
            <LongTextInput source="text" />
        </SimpleForm>
    </Create>
);

export const MessageList = (props) => (
    <List title="All Messages" {...props} filters={<MessageFilter />}>
        <Datagrid>
            <TextField source="id" />
            <DateField source="created" />
            <TextField source="submitter" sortable={false} />
            <TextField source="text" sortable={false} />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);