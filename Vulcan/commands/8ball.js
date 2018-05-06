const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (message.channel.name != "support" && message.channel.name != "bot-test") {
    message.delete();
    message.channel.send("Commands only work in <#429857972630585347>, " + message.author).then(m => m.delete(5000));
    console.log(message.author);
    return;
  }
    if(!args[1]) return message.reply(":x: Error: I need a full question! :x:")
    let replies = ["Yes.",
     "No.",
     "I don't know",
     "Ask again later",
     "Certain",
     "The future will be shown later",
     "Try Again",
     "Replies are hazy!",
     "No idea"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");


    let pUser = message.author;
    let mUser = pUser.tag;
    let ballEmbed = new Discord.RichEmbed()
    .setColor("#42f4bc")
    .addField("Question", question)
    .addField("Answer", replies[result])
    .setTimestamp()
    .setFooter("Requested by " + mUser);

    message.channel.send(ballEmbed);

}

module.exports.help = {
    name: "8ball"
}
