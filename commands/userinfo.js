const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setTitle("Userinfo - " + message.author.username)
  .setColor("#F51414")
  .addField("Username & Discriminator: ", `${message.author.username}#${message.author.discriminator}`)
  .addField("ID:", message.author.id)
  .addField("Created at: ", message.author.createdAt)
 
  message.channel.sendEmbed(embed);
}

module.exports.help = {
  name:"userinfo"
}
