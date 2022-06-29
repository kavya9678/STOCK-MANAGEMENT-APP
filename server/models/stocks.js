var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 


var stockSchema = new Schema({
 
    itemName: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
    },
    currentStock:{
        type: Number,
        default: 0
    },
    manufacturingCompany: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('stocks', stockSchema); 

