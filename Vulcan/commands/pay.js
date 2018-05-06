const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  let botmessage = args.join(" ").slice(30)
  message.delete();

  if (message.channel.name != "friend-chat" && message.channel.name != "bot-test") {
    message.delete();
    message.channel.send("Commands only work in <#429857972630585347>, " + message.author).then(m => m.delete(5000));
    return;
  }
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES")
  let pUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!pUser) message.reply("User not found!").then(m => m.delete(5000));
  let userMention = pUser.user.id;
  let usernameUser = pUser.user.username;
  let discrimUser = pUser.user.discriminator;
  let mUser = usernameUser + "#" + discrimUser;


    if(args[1] === "mcsetup") {
      console.log("#######")
      console.log("New payment due!")
      console.log("ID: " + userMention + " || Discord: " + mUser);
      console.log("Type: Minecraft Server Setup")
      console.log("#######")
      let embed = new Discord.RichEmbed()
      .setTitle(`Payment Message`, true)
      .setDescription("You have 1 due payment", true)
      .setColor("#42f4bc")
      .addField("Amount:", "$" + botmessage, true)
      .addField("For:", "Server Setup", true)
      .addField("User:", pUser, true)
      .setTimestamp()
      .setFooter("Requested by " + mUser);


      message.channel.send("<@" + userMention + ">")
      message.channel.send(embed);
    }
    else if(args[1] === "dbsetup") {
      console.log("#######")
      console.log("New payment due!")
      console.log("ID: " + userMention + " || Discord: " + mUser);
      console.log("Type: Discord Server Setup (Including Bots)")
      console.log("#######")
      let embed = new Discord.RichEmbed()
      .setTitle(`Payment Message`, true)
      .setDescription("You have 1 due payment", true)
      .setColor("#42f4bc")
      .addField("Amount:", "$" + botmessage, true)
      .addField("For:", "Discord Setup (with bots)", true)
      .setTimestamp()
      .setFooter("Requested by" + mUser);

      message.channel.send("<@" + userMention + ">")
      message.channel.send(embed);
    }
    else if(args[1] === "dcsetup") {
      console.log("#######")
      console.log("New payment due!")
      console.log("ID: " + userMention + " || Discord: " + mUser);
      console.log("Type: Discord Server Setup (Not Including Bots)")
      console.log("#######")
      let embed = new Discord.RichEmbed()
      .setTitle(`Payment Message`, true)
      .setDescription("You have 1 due payment", true)
      .setColor("#42f4bc")
      .addField("Amount:", "$" + botmessage, true)
      .addField("For:", "Discord Setup", true)
      .setTimestamp()
      .setFooter("Requested by" + mUser);
      message.channel.send("<@" + userMention + ">")
      message.channel.send(embed);
    }
    else {
      message.reply("Please use !pay <user> <mcsetup, dcsetup, dbsetup> <amount>");
    }


}

module.exports.help = {
  name: "pay"
}
