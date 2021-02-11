const Discord = require('discord.js')
const ffmpeg = require('ffmpeg')
const fs = require('fs')
const WOKCommands = require('wokcommands')
const path = require('path')
const client = new Discord.Client({
	partials: ['MESSAGE', 'REACTION'],
	disableEveryone: false,
})

const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: false, // This options are optional.
});
// You can define the Player as *client.player* to easly access it.
client.player = player;

const config = require('./config.json')

client.on('ready', () => {

	console.log('Клиент запущен')

	const messagesPath = 'messages.json'

	const dbOptions = {
		keepAlive: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	}

	new WOKCommands(client, {
		commandsDir: 'commands',
		featureDir: 'features',
		messagesPath,
		showWarns: true, // Show start up warnings
		dbOptions
	})
	.setMongoPath(config.mongoPath)
    // Set the default prefix for your bot, it is ! by default
    .setDefaultPrefix('-')
    // Set the embed color for your bot. The default help menu will use this. This hex value can be a string too
    .setColor(0xFF5733)
	.setCategorySettings([
		{
		  name: 'Приколы',
		  emoji: '😛'
		},
		{
		  name: 'Магазин',
		  emoji: '💸'
		},
		{
		  // You can change the default emojis as well
		  name: 'Конфигурация',
		  emoji: '🚧',
		  // You can also hide a category from the help menu
		  // Admins bypass this
		  hidden: true
		}
	])

	
})

client.login(config.token)