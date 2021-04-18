const mongo = require('../../mongo')
const welcomeSchema = require('../../schemas/welcome-schema')

module.exports = {
    name: 'Установка канала шахты',
    commands: ['setmine'],
    // permissions: ['ADMINISTRATOR'],
    callback: async ({ message }) => {
        if (!message.guild) return console.log(1)
        const { channel, guild } = message

        await mongo().then(async (mongoose) => {
            try {
                await welcomeSchema.findOneAndUpdate({
                    _id: guild.id,
                },
                {
                    _id: guild.id,
                    mineChannelId: channel.id,
                },
                {
                    upsert: true
                })
            } finally {

            }
        })

        message.react('👌')

        setTimeout(() => {
            message.delete()
        }, 1000)
    }
}