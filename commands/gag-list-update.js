module.exports = {
    name: 'gag list update', // Optional
    commands: ['upd'], // Optional
    aliases: ['обновить'], // Optional
    minArgs: 0,
    maxArgs: 0,
    category: 'Приколы',
    description: 'Обновляет список приколов',
    callback: async ({ message, client }) => {
        const mainGuild = client.guilds.cache.get('579709976029691905')
        const logChannel = mainGuild.channels.cache.get('807116096586252289')
        const logMessage = `>${message.author.username}(${message.guild.member(message.author).nickname}) обновил список приколов`
        logChannel.send(logMessage)

        const Discord = require('discord.js')
        const channel = mainGuild.channels.cache.get('795798533272895548')
        const msg = channel.messages.fetch({around: '796108871957479434', limit: 1})
            .then(msg => {
				msg.first().edit(new Discord.MessageEmbed()
				.setTitle('Список приколов')
				.setColor('#FF5733')
				.addFields(
					{
						name: `smeh`,
						value: `хахаха!`,						
					},
					{
						name: `bruh`,
						value: `брух брухович`,						
					},
					{
						name: `lift`,
						value: `релакс`,
					},
					{
						name: `andrey`,
						value: `андрей-тян`,						
					},
					{
						name: `leha`,
						value: `звук стила бафа`,						
					},
					{
						name: `pososat`,
						value: `дайте ему уже пососать`,
					},
					{
						name: `ai`,
						value: `ой`,						
					},
					{
						name: `huesos`,
						value: `он знает`,						
					},
					{
						name: `cum`,
						value: `ультимативная от никитоса`,
					},
					{
						name: `lya`,
						value: `нож поет сладко`,						
					},
					{
						name: `knife`,
						value: `не тот нож`,						
					},
					{
						name: `выкл`,
						value: `опасно, не выбирать`,						
					},
                ))
            })

            message.react('👌');

    },
    permissions: [],
    requiredRoles: [],
}