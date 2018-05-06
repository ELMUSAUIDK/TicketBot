const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_NICKNAMES")) return errors.noPerms("MANAGE_NICKNAMES");
    let users = bot.users;

    let searchTerm = args[0];
    if(!searchTerm) return message.channel.send("Please provide a search term.");

    let matches = users.filter(u => u.tag.toLowerCase().includes(searchTerm.toLowerCase()));
    

    message.channel.send(matches.map(u => u.tag).join(", "));

}

module.exports.help = {
  name: "findusers"
}
