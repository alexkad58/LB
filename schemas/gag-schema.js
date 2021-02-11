const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const reqString = {
    type: String,
    required: true
}

const gagSchema = mongoose.Schema({
    _id: reqString,
    text: reqString,
    count: {
        type: Number,
        default: 0
    },
    inventory: {
        type: Object
    }
})

module.exports = mongoose.model('gag-info', gagSchema)