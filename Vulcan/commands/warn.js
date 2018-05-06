const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const errors = require("../utils/errors.js");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply(":x: Error: I couldn't find that user! :x:");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: Error: You can't warn that user! :x:");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setTitle("--- Warning ---")
  .setDescription("A user was warned!")
  .setColor("#42f4bc")
  .addField("User:", `<@${wUser.id}>`, true)
  .addField("By:", `${message.author}`, true)
  .addField("Channel:", message.channel, true)
  .addField("Warnings:", warns[wUser.id].warns, true)
  .addField("Reason:", reason, true)
  .setFooter("Bot created by Court#6732");

  let logchannel = message.guild.channels.find(`name`, "logs");
  if(!logchannel) return message.reply(":x: Error: I couldn't find a log (#logs) channel! :x:");


  message.delete().catch(O_o=>{});
  message.channel.send("User has been warned!")
  logchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 3){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole){
      console.log(`Creating "Muted" role!`)
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            // Removes permissions
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e) {
            console.log(e.stack);
        }
    }

    let mutetime = "1h";
    await(wUser.addRole(muterole.id));
    logchannel.send(`<@${wUser.id}> has been temporarily muted (3 warnings)`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
    logchannel.send(`<@${wUser.id}> has been unmuted. (3 warnings)`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 5){
    message.guild.member(wUser).kick(reason);
    message.reply(`<@${wUser.id}> has been kicked. (5 warnings)`)
  }

}

module.exports.help = {
  name: "warn"
}
