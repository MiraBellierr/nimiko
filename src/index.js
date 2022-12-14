require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const { getNews, getHoloNews } = require("./util/getNews");
const intents = [];

Object.keys(Discord.IntentsBitField.Flags).forEach((intent) => {
	intents.push(intent);
});

const client = new Discord.Client({
	intents,
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.voiceChannels = new Discord.Collection();
client.categories = fs.readdirSync("src/commands/");

["command", "event"].forEach((handler) => {
	require(`./handler/${handler}`)(client);
});

getNews(client);
getHoloNews(client);

setInterval(() => {
	getNews(client);
	getHoloNews(client);
}, 60000);

client.login(process.env.TOKEN);
