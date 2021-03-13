const { app } = require('../../server')
const path = require('path')

module.exports = {
    callback: async ({ message, args, text, client, prefix, instance }) => {
        getName = () => {
            if (message.member.nickname) {
                return message.member.nickname 
            } else {
                return message.author.username
            }
        }
        let party = []
        party[0] = message.author
        message.delete()
        message.channel.send(`
            **${getName()}** хочет буба ставь класс\nУчастники:\n>>> ${party[0]}`)
        .then(msg => {
        msg.react('▶')
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
                if (user == client.user || party.indexOf(user) != -1 || party.length === 3) return
                party.push(user)
                await msg.edit(`${msg.content}\n${user}`)
                if (party.length === 3) {
                    app.get(`/${msg.id}`, (req, res) => {
                        res.send(`<h1>${party[0].username}</h1>
                        <h1>${party[1].username}</h1>
                        <h1>${party[2].username}</h1>`)
                        console.log(req.requestTime)
                    })
                    
                    msg.edit(`${msg.content}\nСОБРАЛИ ПАТИ!`)
                }
                return
            }
        });
    })   
    }
}