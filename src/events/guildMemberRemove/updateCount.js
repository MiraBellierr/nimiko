const memberCount = require("../../util/memberCount");

module.exports = async (client) => {
	await memberCount(client);
};
