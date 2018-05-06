const Discord = require("discord.js");
const agree = "✅";
const disagree = "❎";


module.exports.run = async (bot, message, args) => {


  let topic = args.join(" ");

  if(!topic) return message.channel.send("Please specify your vote");

    let msg = await message.channel.send(topic); // Await waits for message to be done sending
    await msg.react(agree); // Bot reacts with "agree"
    await msg.react(disagree); // Bot reacts with "disagree"



    const reactions = await msg.awaitReactions(reaction => {return reaction.emoji.name === agree || reaction.emoji.name === disagree;}, {time: 5000}); 
    msg.edit(`Voting over!\n\n ${agree}: ${reactions.get(agree).count-1}\n${disagree}: ${reactions.get(disagree).count-1}`); // Displays count of votes.
    console.log(`Vote has been finished in ${message.guild.name}`);



}

module.exports.help = {
  name: "vote"
}
