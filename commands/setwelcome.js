const mongo = require('mongoose')
const welcomeSchema = require('../schemas/welcome-schema')

module.exports = {
    name: 'Приветственное сообщение', // Optional
    commands: ['setwelcome'], // Optional
    aliases: ['setwlcm'], // Optional
    category: 'Configuration',
    minArgs: 1,
    description: 'Устанавливает приветственное сообщение',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const { member, channel, guild } = member

        await mongo().then(mongoose => {
            try {
                await welcomeSchema.findOneAndUpdate({
                    _id: guild.id,
                },
                {
                    _id: guild.id,
                    channelId: channel.id,
                    text: text
                },
                {
                    upsert: true
                })
            } finally {
                
            }
        })
    },
    permissions: ['ADMINISTRATOR'],
}