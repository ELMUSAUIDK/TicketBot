

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let infoUser = message.guild .member(message.mentions.users.first()) || message.author;

    let userEmbed = new Discord.RichEmbed()
    .setAuthor(`User Info -` + infoUser.user.tag || message.author.tag)
    .setThumbnail(infoUser.user.displayAvatarURL)
    .addField("ID", infoUser.user.id, true)
    .addField("Status", infoUser.user.presence.status, true)
    .addField("Game", infoUser.user.presence.game.name, true)
    .addField("Joined", message.guild.member.joinedAt, true)
    .addField("Created", infoUser.user.createdAt, true);

    //message.channel.send(`User - ${infoUser.user.tag}\nID: ${infoUser.user.id}\nGame: ${infoUser.user.presence.game.name}\nJoined: Not working\nCreated: ${infoUser.user.createdAt}`);

    message.channel.send(userEmbed);
    console.log(message.guild);


}

module.exports.help = {
  name: "userinfo"
}
