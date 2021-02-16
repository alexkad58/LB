const welcomeSchema = require('../schemas/welcome-schema')

const mongo = require('../mongo')

module.exports = (client, instance) => {
    client.on('guildMemberRemove', async (member) => {
        const cache = {}
        let data = cache[member.guild.id]
        if (!data) {
            await mongo().then(async (mongoose) => {
                try {
                    const results = await welcomeSchema.findOne({
                        _id: member.guild.id
                    })
                    cache[member.guild.id] = data = [results.qchannelId, results.qtext]
                } finally {

                }
            })
        }
        const qchannelId = data[0]
        const qtext = data[1]
        const channel = member.guild.channels.cache.get(qchannelId)
        channel.send(qtext.replace(`@`, `<@${member.id}>`))
    })
}
module.exports.config = {
    displayName: 'Bye message', // Can be changed any time
    dbName: 'BYE_MESSAGE'
  }