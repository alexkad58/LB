const mongoose = require('mongoose')
// const { mongoPath } = require('./config.json')
const mongoPath = 'mongodb+srv://insideuser:insideuser@cluster0.6lpx8.mongodb.net/LB?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}