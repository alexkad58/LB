const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const reqString = {
    type: String,
    required: true
}

const gagSchema = mongoose.Schema({
    _id: reqString,
    text: reqString,
})

module.exports = mongoose.model('gag-info', gagSchema)