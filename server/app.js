const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/gql-test', {
    useNewUrlParser: true, useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open',()=>{
    console.log('Connected to Database');
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log('Now Listning for request on port 4000...');
});
