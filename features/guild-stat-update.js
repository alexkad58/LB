module.exports = (client, instance) => {
    setInterval(() => {
        let current = new Date();
        let myGuild = client.guilds.cache.get("579709976029691905")
		let memberCount = myGuild.memberCount
        let memberCountChannel = myGuild.channels.cache.get("806917712953212968")
        let rolesCount = myGuild.roles.cache.size
		let rolesCountChannel = myGuild.channels.cache.get('806918251257790474')
        let timeDisplayChannel = myGuild.channels.cache.get('808246367209783326')
        let time = `${current.toLocaleDateString()}`
        timeDisplayChannel.setName(`⌚${time}`)
        console.log(`⌚${time} ${current.toLocaleTimeString().slice(0, -3)}`)
		memberCountChannel.setName(`УЧАСТНИКОВ: ${memberCount}`)
		rolesCountChannel.setName(`РОЛЕЙ: ${rolesCount}`)
    }, 1000 * 60 * 10)
}
module.exports.config = {
    displayName: 'Guild stat update', // Can be changed any time
    dbName: 'GUILD_STAT_UPDATE'
  }