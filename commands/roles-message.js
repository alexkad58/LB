const mongo = require('../mongo')
const rolesMessageSchema = require('../schemas/roles-message-schema')
const { addToCache } = require('../features/rr')

module.exports   = {
    commands: ['rlsmsg'], // Optional
    requiredPermission: 'ADMINISTRATOR',
    expectedArgs: '[#канал] <текст сообщения>',
    minArgs: 1,

    callback: async ({ message, args, client, prefix, instance }) => {
        const { guild, mentions } = message 
        const { channels } = mentions
        const targetChannel = channels.first() || message.channel

        if (channels.first()) {
            args.shift()
        }

        const text2 = args.join(' ')

        const newMessage = await targetChannel.send(text2)

        addToCache(guild.id, newMessage)

        new rolesMessageSchema({
            guildId: guild.id,
            channelId: targetChannel.id,
            messageId: newMessage.id
        })
            .save()
            .catch(() => {
                message.react('🚫')
            })
    }
}