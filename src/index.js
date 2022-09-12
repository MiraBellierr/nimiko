require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const intents = [];

Object.keys(Discord.IntentsBitField.Flags).forEach((intent) => {
	intents.push(intent);
});

const client = new Discord.Client({
	intents,
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("src/commands/");

["command", "event"].forEach((handler) => {
	require(`./handler/${handler}`)(client);
});

client.login(process.env.TOKEN);
