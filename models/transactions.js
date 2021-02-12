const mongoose = require("mongoose");

const transSchema = new mongoose.Schema({
    from : {
        type : String,
        required: true
    },
    to : {
        type : String,
        required: true
    },
    transferAmount : {
        type : Number,
        required: true
    }
})


const Transaction = mongoose.model('Transaction', transSchema);

module.exports = Transaction;