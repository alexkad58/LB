module.exports = {
    commands: ['poshelnahooi'],
    minArgs: 2,
    callback: async ({ message, args }) => {
        const role = message.guild.roles.cache.get(args[0])
        const member = message.guild.members.cache.get(args[1])
        member.roles.remove(role)
    }
}