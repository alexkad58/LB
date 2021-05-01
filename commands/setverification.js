const verificationSchema = require('../schemas/verification-schema')
const { fetch } = require('../features/verification')


module.exports = {
    permissons: ['ADMINISTRATOR'],
    minArgs: 2,
    expectedArgs: '<emoji> <role>',
    callback: async ({ message }) => {
        const { guild, channel } = message

        let emoji = args[0]
        if (emoji.includes(':')) { 
            const split = emoji.split(':')
            const emojiName = split[1]

            emoji = guild.emojis.cache.find((emoji) => {
                return emoji.name === emojiName
            })
        }
        const roleId = args[1]

        const role = guild.roles.cache.get(roleId)

        if (!role) return

        message.delete({ timeout: 2000 }).then(() => {
            channel.messages.fetch({ limit: 1 }).then(results => {
                const firstMessage = results.first()

                if (!firstMessage) return

                firstMessage.react(emoji)

                await verificationSchema.findOneAndUpdate({
                        guildId: guild.id
                    }, {
                        guildId: guild.id,
                        channelId: channel.id,
                        roleId
                    }
                )

                await fetch()
            })
        })
    }
}