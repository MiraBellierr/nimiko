const Discord = require("discord.js");

module.exports = async (client, news) => {
	const channel = await client.channels.fetch("1019470434095337472");

	const embed = new Discord.EmbedBuilder()
		.setTitle(news.title)
		.setURL(news.link)
		.setImage(news.img)
		.setDescription(news.desc)
		.setColor(Discord.Colors.Navy)
		.setTimestamp(new Date(news.date));

	const m = await channel.send({
		content: `Recent news has just published on <t:${Math.floor(
			new Date(news.date).getTime() / 1000
		)}:f>`,
		embeds: [embed],
	});

	m.crosspost();
};
