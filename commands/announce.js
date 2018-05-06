const Discord = require("discord.js");
const config = require("../settings.json"); // SINGLE DOT MEANS "CURRENT FOLDER"; DOUBLE DOT MEANS "BACK 1 FOLDER"
const errors = require("../utils/errors.js");
const prefixes = require("../prefixes.json");


module.exports.run = async (bot, message, args) => {

  //message.delete();
  //if(!message.member.hasPermission("MANAGE_SERVER")) return errors.noPerms(message, "MANAGE_SERVER");
  let aChannel = args[0];
  let botMessage = args.slice(1).join(" ");

  let annChannel = message.guild.channels.find(`CHANNEL_ID`, aChannel);

  message.channel.send(`\\${aChannel}` + botMessage);
  //console.log(message.guild.channels);


}

module.exports.help = {
  name: "announce"
}
