const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES")
let friendedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!friendedUser) message.channel.send("User not found!");
let friendRole = message.guild.roles.find("name", "Friends");
let friendChat = message.guild.channels.find(`name`, "friend-chat");

if(friendedUser.roles.has(friendRole.id)) return message.reply("That user has that role already!").then(msg => msg.delete(5000));
await(friendedUser.addRole(friendRole.id));
message.channel.send("Success! :white_check_mark:").then(m => m.delete(5000));
friendChat.send(friendedUser + " is now a friended user!");

}


module.exports.help = {
    name: "friend"
}
