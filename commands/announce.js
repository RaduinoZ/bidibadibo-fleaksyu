const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You cannot execute this command!");

  const sayMessage = args.join(" ");

  let announceEmbed = new Discord.RichEmbed()
      .setTitle(":exclamation: Announcement :exclamation:")
      .setColor("#F51414")
      .addField("The announcement is: ", sayMessage);

  let newschannel = message.guild.channels.find(`name`, "news");
  if (!newschannel) return message.channel.send("Couldn't find news channel.");

  newschannel.send(announceEmbed);
}

module.exports.help = {
  name:"announce"
}
