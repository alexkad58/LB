const Discord = require('discord.js')
const ffmpeg = require('ffmpeg');
const fs = require('fs');
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const mongo = require('./mongo')
const welcome = require('./welcome')
const gag = require('./gag')

client.on('ready', async () => {
	console.log('Клиент запущен')

	await mongo().then(mongoose => {
		try {
			console.log('Клиент подключен к db')
		} finally {
			mongoose.connection.close()
		}
	})

	welcome(client)

	gag(client)

	command(client, ['сука', 'хуй'], (message) => {
		message.channel.send('суюка хуюка')
	})
	
	command(client, ['сас', 'сыс'], (message) => {
		message.reply('сасыс')
	})

	command(client, 'сервера', (message) => {
		client.guilds.cache.forEach(guild => {
			var ld = guild.memberCount % 10;
			if(ld == 1) {
				var lr = 'чел'
			} else {
				if(ld<5 && ld!=0){
					var lr = 'чела'
				} else {
					var lr = 'челов'
				}
			}
			message.channel.send(`В **\u0060${guild.name}\u0060** сейчас **${guild.memberCount}** ${lr}`)
		})
	})

})

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (oldMember.serverMute === false && newMember.serverMute === true && newMember.id == '234215425309671425') {
        console.log('переподключил', newMember.member.user.username)
        const channelrout = newMember.channelID

        newMember.setChannel('728092459707662388')
        setTimeout(() => {
        newMember.setChannel(channelrout)}, 200);
        newMember.setMute(false)
    }

});

client.login(config.token)