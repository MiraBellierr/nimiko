module.exports = async (client, member) => {
	const channel = await client.channels.fetch("1017088769280712776");
	const rules = await client.channels.fetch("1017088594533433455");
	const verify = await client.channels.fetch("1017088779758092420");
	const partner = await client.channels.fetch("1017088763991699487");

	channel.send({
		content: `------------------------\nWelcome ${member}!\n\n- Please read our rules at ${rules}.\n- Verify and get access to the server in ${verify}.\n- Check out our partners in ${partner}.\n\nPlease enjoy your stay! ^-^\n------------------------`,
		files: ["./src/img/welcome.gif"],
	});
};
