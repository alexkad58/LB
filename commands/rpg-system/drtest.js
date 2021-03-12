const server = require('../../server')
const path = require('path')

module.exports = {
    callback: async ({ message, args, text, client, prefix, instance }) => {
        server.app.get(`/${message.id}`, (req, res) => {
        	res.send(`<h1>${message.author.username}</h1>`)
        })
        
        message.reply(`https://LB.alexkad58.repl.co/${message.id}`)
    }
}