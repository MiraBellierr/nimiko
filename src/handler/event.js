const fs = require("fs");

module.exports = (client) => {
	fs.readdirSync("src/events/").forEach((dir) => {
		const events = fs.readdirSync(`src/events/${dir}/`);

		for (const file of events) {
			const module = require(`../events/${dir}/${file}`);

			client.on(dir.split(".")[0], (...args) => module(client, ...args));
		}
	});
};
