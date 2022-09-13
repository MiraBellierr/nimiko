const Discord = require("discord.js");

module.exports = async (client, oldState, newState) => {
	if (newState.channelId === "1017088743510909001") {
		const member = await newState.guild.members.fetch(newState.member);
		const channel = await newState.guild.channels.create({
			name: member.user.username,
			type: Discord.ChannelType.GuildVoice,
			parent: newState.channel.parentId,
		});

		newState.setChannel(channel);

		client.voiceChannels.set(newState.member.id, channel);
	}

	const channel = client.voiceChannels.get(oldState.member.id);

	if (oldState && oldState.channelId === channel.id) {
		oldState.guild.channels.delete(channel);
	}
};
