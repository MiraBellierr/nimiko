module.exports = async (client) => {
	const guild = await client.guilds.cache.get("1017087638789959700");
	const channel = await client.channels.fetch("1017088563277479966");

	channel.edit({
		name: `︱🎀∷･Members･ﾟ୨ ${guild.memberCount} ୧`,
	});
};
