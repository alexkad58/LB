const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const volumeSchema = mongoose.Schema({
    _id: reqString,
    volume: reqString,
})

module.exports = mongoose.model('volume', volumeSchema)