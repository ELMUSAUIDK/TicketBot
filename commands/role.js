const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../settings.json");

module.exports.run = async (bot, message, args) => {

    //!role @user <role>

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have access!");

    let roleUser = message.guild .member(message.mentions.users.first());
    if(!roleUser) return message.channel.send("User could not be found!");
    let roleName = args.slice(1).join(" "); // grabs role name
    if(!roleName) return message.channel.send("Please specify or create role.");
    let guildRole = message.guild.roles.find(`name`, roleName);
    if (!guildRole) return message.reply("I couldn't find that role.");

    // BEGIN ADDROLE portion
    if(!roleUser.roles.has(guildRole.id)){
        message.channel.send(`Changed roles for ${roleUser}, +${guildRole.name}`);
        await(roleUser.addRole(guildRole.id));
    } else { // remove role
       message.channel.send(`Changed roles for ${roleUser}, -${guildRole.name}`); 
        await(roleUser.removeRole(guildRole.id));
    }
}

module.exports.help = {
  name: "role"
}