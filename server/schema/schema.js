const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList } = graphql;

// var books = [
//     { name: 'book1', genre: 'horror', id: '1', authorid: '1' },
//     { name: 'book2', genre: 'horror', id: '2', authorid: '2' },
//     { name: 'book3', genre: 'comedy', id: '3', authorid: '1' }
// ]
// var authors = [
//     { name: 'Author1', age: 56, id: '1' },
//     { name: 'Author2', age: 66, id: '2' },
//     { name: 'Author3', age: 33, id: '3' }
// ]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorid })
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: graphql.GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorid: parent.id })
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return books;
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})