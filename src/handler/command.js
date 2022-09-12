const fs = require("fs");

module.exports = (client) => {
	fs.readdirSync("src/commands/").forEach((dir) => {
		const files = fs.readdirSync(`src/commands/${dir}/`);

		for (const file of files) {
			const command = require(`../commands/${dir}/${file}`);

			if (command.name) {
				client.commands.set(command.name, command);
			}

			if (command.aliases && Array.isArray(command.aliases)) {
				command.aliases.forEach((alias) =>
					client.aliases.set(alias, command.name)
				);
			}
		}
	});
};
