// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import { authClient, restClient } from 'aor-feathers-client';
import UserIcon from '@material-ui/icons/Group';
import LeadIcon from '@material-ui/icons/Book';
import MessageIcon from '@material-ui/icons/ChatBubble';
import CatIcon from '@material-ui/icons/Favorite';

import feathersClient from './feathersClient';
import { UserList, UserEdit, UserCreate } from './users';
import { LeadList, LeadEdit, LeadCreate } from './leads';
import { CatList, CatEdit, CatCreate } from './cats';
import { MessageList, MessageEdit, MessageCreate } from './messages';

const authClientOptions = {
  storageKey: 'feathers-jwt',
  authenticate: { strategy: 'local' },
};

// to rename id field for *all* resources use this syntax:
const options = { id: '_id' };

const App = () => (
    <Admin
      title="Demo API Admin App"
      authProvider={authClient(feathersClient, authClientOptions)}
      dataProvider={restClient(feathersClient, options)}>
        <Resource name="users" icon={UserIcon}
          list={UserList} edit={UserEdit} create={UserCreate} />
        <Resource name="leads" icon={LeadIcon}
          list={LeadList} edit={LeadEdit} create={LeadCreate} />
        <Resource name="messages" icon={MessageIcon}
          list={MessageList} edit={MessageEdit} create={MessageCreate} />
        <Resource name="cats" icon={CatIcon}
          list={CatList} edit={CatEdit} create={CatCreate} />
    </Admin>
);
export default App;