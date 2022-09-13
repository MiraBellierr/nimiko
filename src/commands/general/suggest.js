const Discord = require("discord.js");

module.exports = {
	name: "suggest",
	description: "Suggest anything so server can be good",
	category: "general",
	run: async (client, message, args) => {
		if (!args.length)
			return message.channel.send(
				"Please include your suggestions with the command."
			);

		const suggestChannel = await client.channels.fetch("1017088619791527966");
		const suggestions = args.join(" ");

		message.delete();

		const embed = new Discord.EmbedBuilder()
			.setAuthor({
				name: message.author.username,
				iconURL: message.author.displayAvatarURL(),
			})
			.setThumbnail("https://cdn3.emoji.gg/emojis/7127-bow.png")
			.setFields([
				{
					name: "Suggestions",
					value: suggestions,
				},
			])
			.setColor(Discord.Colors.DarkButNotBlack)
			.setTimestamp();

		const m = await suggestChannel.send({ embeds: [embed] });

		m.react("✅");
		m.react("❎");

		message.channel.send(
			`Hi ${message.author}, thank you for your suggestions ^-^`
		);
	},
};
