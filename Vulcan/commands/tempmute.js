const Discord = require("discord.js");
const ms = require("ms");
const errors = require("../utils/errors.js");

// Starting code
module.exports.run = async (bot, message, args) => {

    // Main constructor
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    let tomute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!tomute) return message.reply(":x: Error: I couldn't find that user! :x:");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: Error: You can't warn that user! :x:");
    let muterole = message.guild.roles.find("name", "Muted");

    // Creates role
    const Discord = require("discord.js");
    const ms = require("ms");

    // Starting code
    module.exports.run = async (bot, message, args) => {

        // Main constructor
        let tomute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!tomute) return message.reply(":x: Error: I couldn't find that user! :x:");
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Error: No permissions! :x:");
        if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: Error: You can't warn that user! :x:");
        let muterole = message.guild.roles.find("name", "Muted");
        let reason = args.join(" ").slice(25);

      //-- Creation of Role
      if(!muterole){
        try{
          muterole = await message.guild.createRole({
            name: "Muted",
            color: "#000000",
            permissions:[]
          })
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }catch(e){
          console.log(e.stack);
        }
      }
      // -- Specifying a time!

      let logchannel = message.guild.channels.find(`name`, "logs");
      if(!logchannel) return message.channel.send(":x: Error: I couldn't find a log (#logs) channel. :x:");

      let mutetime = args[1];
      if(!mutetime) return message.reply(":x: Error: No time specified :x:");

      await(tomute.addRole(muterole.id));

      setTimeout(function(){
        tomute.removeRole(muterole.id);
        logchannel.send(`<@${tomute.id}> has been unmuted!`);
      }, ms(mutetime));


    // Embed
    let tmEmbed = new Discord.RichEmbed()

    .setTitle("--- Tempmute ---")
    .setDescription("A user was muted!")
    .setColor("#42f4bc")
    .addField("User:", `${tomute}`, true)
    .addField("By:", `${message.author}`, true)
    .addField("Channel:", message.channel, true)
    .addField("Time:", `${ms(ms(mutetime))}`, true)
    .addField("Reason:", reason, true)
    .setTimestamp()
    .setFooter("Bot created by Court#6732");

      message.delete().catch(O_o=>{});
      message.channel.send("User has been muted!")
      logchannel.send(tmEmbed);

    }
    // -- End of Module
    }

module.exports.help = {
    name: "tempmute"
}
