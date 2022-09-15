const Discord = require("discord.js");

module.exports = async (client, url) => {
	const channel = await client.channels.fetch("1019886964268351488");

	const m = await channel.send(`${url}`);

	// m.crosspost();
};
