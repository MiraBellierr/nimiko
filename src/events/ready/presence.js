const Discord = require("discord.js");

module.exports = async (client) => {
	const guild = await client.guilds.cache.get("1017087638789959700");

	client.user.setPresence({
		activities: [
			{
				name: `in ${guild.name}`,
			},
		],
		status: Discord.PresenceUpdateStatus.Idle,
	});

	console.log(`${client.user.username} is now launched!`);
};
