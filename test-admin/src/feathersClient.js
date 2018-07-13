// in src/feathersClient.js
import feathers from "@feathersjs/client";
import auth from "@feathersjs/authentication-client";

const host = 'http://localhost:3030';
const authOptions = {
    secret: 'supersecret',
    jwtStrategy: 'jwt', storage: window.localStorage
};

export default feathers()
    .configure(feathers.rest(host).fetch(window.fetch.bind(window)))
    .configure(auth(authOptions));