const welcomeSchema = require('../schemas/welcome-schema')

const mongo = require('../mongo')

module.exports = (client, instance) => {
    client.on('guildMemberAdd', async (member) => {
        const cache = {}
        let data = cache[member.guild.id]
        if (!data) {
            await mongo().then(async (mongoose) => {
                try {
                    const results = await welcomeSchema.findOne({
                        _id: member.guild.id
                    })
                    cache[member.guild.id] = data = [results.channelId, results.text]
                } finally {

                }
            })
        }
        const channelId = data[0]
        const text = data[1]
        const channel = member.guild.channels.cache.get(channelId)
        channel.send(text.replace(`@`, `<@${member.id}>`))
    })
}
module.exports.config = {
    displayName: 'Welcome message', // Can be changed any time
    dbName: 'WELCOME_MESSAGE'
  }