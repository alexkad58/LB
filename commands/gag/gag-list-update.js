module.exports = {
    name: 'gag list update', // Optional
    commands: ['upd'], // Optional
    aliases: ['обновить'], // Optional
    minArgs: 0,
    maxArgs: 0,
    category: 'Приколы',
    description: 'Обновляет список приколов',
    callback: async ({ message, client }) => {
        const Discord = require('discord.js')
            let emb = new Discord.MessageEmbed()
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
                )
         
			message.channel.send(emb)
            message.react('👌');

    },
}