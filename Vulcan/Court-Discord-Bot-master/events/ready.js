const tokens = require('../tokens.json');
const Discord = require("discord.js");
const client = new Discord.Client({fetchAllMembers: true});
const log = require(`../handlers/logHandler.js`);

module.exports = async client => {
  client.user.setActivity(`${tokens.prefix}help | ${client.users.keyArray().length} Users Online`, { type: `${tokens.activity.type}`, url: `${tokens.activity.url}` });
  log.info(`${client.users.keyArray().length} Users Online`);
}
