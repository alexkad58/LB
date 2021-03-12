const server = require('../../server')
const path = require('path')

module.exports = {
    callback: async ({ message, args, text, client, prefix, instance }) => {
        message.react('▶')
        let party = []
        party[0] = message.author
        client.on('messageReactionAdd', async (reaction, user) => {
            // When we receive a reaction we check if the reaction is partial or not
            if (reaction.partial) {
                // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
                try {
                    await reaction.fetch();
                } catch (error) {
                    console.error('Something went wrong when fetching the message: ', error);
                    // Return as `reaction.message.author` may be undefined/null
                    return;
                }
            }
            if (reaction.emoji.name === '▶') {
                party.push(user)
                if (party.length === 3) {
                    server.app.get(`/${message.id}`, (req, res) => {
                        res.send(`<h1>${pary[0].username}</h1>
                        <h1>${pary[1].username}</h1>
                        <h1>${pary[2].username}</h1>`)
                    })
                    
                    message.reply(`Участники: \n ${pary[0].username} \n ${pary[1].username} \n ${pary[2].username} \n https://LB.alexkad58.repl.co/${message.id}`)
                }
                return
            }
        });
        
    }
}