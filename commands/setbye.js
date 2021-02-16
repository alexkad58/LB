const mongo = require('../mongo')
const welcomeSchema = require('../schemas/welcome-schema')

module.exports = {
    name: 'Прощальное сообщение', // Optional
    commands: ['setbye'], // Optional
    aliases: ['setb'], // Optional
    category: 'Configuration',
    minArgs: 1,
    description: 'Устанавливает прощальное сообщение',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const { member, channel, guild } = message

        await mongo().then(async (mongoose) => {
            try {
                await welcomeSchema.findOneAndUpdate({
                    _id: guild.id,
                },
                {
                    _id: guild.id,
                    qchannelId: channel.id,
                    qtext: text
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