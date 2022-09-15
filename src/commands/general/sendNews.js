const { getAllNews } = require("../../util/getNews");
const Discord = require("discord.js");

module.exports = {
	name: "sendnews",
	description: "send news to anime feed channel",
	run: async (client, message, args) => {
		if (message.author.id !== "548050617889980426") return;

		if (!args.length) {
			const news = await getAllNews(client);

			const titles = news.map((n, i) => `[${i + 1}] - ${n.title}`);

			const embed = new Discord.EmbedBuilder()
				.setTitle("News")
				.setDescription(titles.join("\n"))
				.setColor(Discord.Colors.Aqua);

			message.reply({ embeds: [embed] });

			return;
		}

		const arg = args[0];

		if (isNaN(arg)) return message.reply("Please provide a valid id");

		const id = parseInt(arg) - 1;

		const channel = await client.channels.fetch("1019470434095337472");

		const news = await getAllNews(client);

		const Retnews = news[id];

		const embed = new Discord.EmbedBuilder()
			.setTitle(Retnews.title)
			.setURL(Retnews.link)
			.setImage(Retnews.img)
			.setDescription(Retnews.desc)
			.setColor(Discord.Colors.Navy)
			.setTimestamp(new Date(Retnews.date));

		const m = await channel.send({
			content: `Recent news has just published on <t:${Math.floor(
				new Date(Retnews.date).getTime() / 1000
			)}:f>`,
			embeds: [embed],
		});

		m.crosspost();
	},
};
