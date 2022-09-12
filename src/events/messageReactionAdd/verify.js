module.exports = async (client, messageReaction, user) => {
	if (messageReaction.emoji.name === "❤️") {
		if (messageReaction.message.id === "1018784536307445802") {
			const guild = await client.guilds.fetch("1017087638789959700");
			const member = await guild.members.fetch(user);
			const channel = await client.channels.fetch("1017088660899901470");
			const welcomeRole = await guild.roles.fetch("1017088456159133748");

			member.roles.add([
				"1017088441403576320",
				"1017088357517512734",
				"1017088144635609128",
				"1017088139782795264",
				"1017088120681934898",
				"1017088052490928129",
				"1017087994609532958",
				"1017087984350281749",
			]);

			channel.send(
				`Hi ${welcomeRole}!\nPlease welcome our new member to the server!\n\nWelcome ${member} to the server! ^-^`
			);
		}
	}
};
