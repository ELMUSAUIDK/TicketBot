const Discord = require("discord.js");
const config = require("../settings.json");
const fs = require("fs");
const ms = require("ms");
const errors = require("../utils/errors.js");
const prefixes = require("../prefixes.json");


let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  let prefix = prefixes[message.guild.id].prefixes;

  //!warn @user REASON

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  let warnUser = message.guild .member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let reason = args.slice(1).join(" ");
  if(!args[0]) return message.channel.send(`${prefix}help to find usage.`);
  if(!warnUser) return errors.noUser(message);


  if(!warns[warnUser.id]) warns[warnUser.id]= { //CHECKS TO SEE IF USER HAS WARNINGS, IF THEY DONT IT CREATES A TABLE
    warns: 0
  };

  warns[warnUser.id].warns++; // ADDS A WARNING

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => { //ADD WARNINGS TO FILE
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed() //Warn embed
  .setAuthor(`USER WARNED | ${warnUser.tag}`, warnUser.displayAvatarURL) // Can't get user tag to work
  .setColor("#fuwid2")
  .addField("Warned User", warnUser, true)
  .addField("Moderator", message.author, true)
  .addField("Number of Warnings", warns[warnUser.id].warns, true)
  .addField("Reason", reason)
  .setFooter(`ID: ${warnUser.id}`)
  .setTimestamp();

  let modChannel = message.guild.channels.find(`name`, config.logChannelName); //SETS LOG CHANNEL
  if (!modChannel) return message.channel.send(`I cannot find the log channel!`);

  message.delete().catch(O_o=>{});
  message.channel.send(`${warnUser} has been warned! :warning:`);
  modChannel.send(warnEmbed);

  if(warns[warnUser.id].warns === 2){
    let muteRole = message.guild.roles.find(`name`, "Muted");
    if(!muteRole) return;

    let muteTime = "10s";
    await(warnUser.addRole(muteRole.id));
    message.channel.send(`${warnUser} has been temporarily muted`);

    setTimeout(function(){
      warnUser.removeRole(muteRole.id);
      message.channel.send(`They have been unmuted.`);
    });
  }
  if(warns[warnUser.id].warns === 20){
    message.guild.member(warnUser).ban(reason);
    modChannel.send(`${warnUser.tag} has been banned for 20 warnings with reason: ${reason}`);
  }



}

module.exports.help = {
  name: "warn"
}
