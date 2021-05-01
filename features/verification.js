const verificationSchema = require('../schemas/verification-schema')

let verificationCache = {}

const fetchData = async (client) => {

    const results = await verificationSchema.find({})

    for(const result of results) {
        const guild = client.guilds.cache.get(result.guildId)
        if (guild) {
            const channel = guild.channels.cache.get(result.channelId)
            if (channel) {
                verificationCache[result.channelId] = result.roleId
                channel.messages.fetch()
            }
        }
    }
}

const populateCache = async (client) => {
    verificationCache = {}

    await fetchData(client)

    setTimeout(populateCache, 1000 * 60 * 10)
}

module.exports = (client) => {
    populateCache(client)

    client.on('messageReactionAdd', (reaction, user) => {
        const channelId = reaction.message.channel.channelId
        const roleId = verificationCache[channelId]

        if (roleId) {
            const { guild } = reaction.message
            const member = guild.members.cache.get(user.id)
            member.roles.add(roleId)
        }
    })
}

module.exports.fetch = fetchData