const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  if (message.channel.name != "friend-chat" && message.channel.name != "bot-test") {
    message.delete();
    message.channel.send("Commands only work in <#429857972630585347>, " + message.author).then(m => m.delete(5000));
    return;
  }

  let pUser = message.author;
  let mUser = pUser.tag;

    let color = ((1 << 24) * Math.random() | 0).toString(16); //Generates random hex value.
    let embed = new Discord.RichEmbed() //Embeds.
        .setTitle(`#${color}`)
        .setColor(`#${color}`)
        .setTimestamp()
        .setFooter("Requested by " + mUser);
    message.channel.send(embed);
    }

module.exports.help = {
    name: "hex"
}
