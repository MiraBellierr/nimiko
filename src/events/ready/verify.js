module.exports = async (client) => {
	const channel = await client.channels.fetch("1017088779758092420");
	const message = await channel.messages.fetch("1018784536307445802");

	message.react("❤️");
};
