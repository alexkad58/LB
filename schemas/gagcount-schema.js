const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const reqString = {
    type: String,
    required: true
}

const gagcountSchema = mongoose.Schema({
    _id: reqString,
    count: { 
        type: Number, 
        default: 0
    }
})

module.exports = mongoose.model('gag-count', gagcountSchema)