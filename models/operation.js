// const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

const bookStoreSchema = mongoose.Schema({
    name : {
        type : 'String',
        require  :true
    },
    author_name : {
        type  :'String',
        require  :true
    },
    price : {
        type  : 'String',
        require  :true
    },
    award : {
        type : 'String',
        require  :true
    },
    pages : {
        type  :'String',
        require : true
    }
})

let operation = mongoose.model('bookStore',bookStoreSchema);
module.exports = operation;