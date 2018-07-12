const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You cannot execute this command!");

  const sayMessage = args.join(" ");

  let announceEmbed = new Discord.RichEmbed()
      .setDescription(":exclamation: Announcement :exclamation:")
      .setColor("#EE730C")
      .addField("The announcement is: ", sayMessage);

  let newschannel = message.guild.channels.find(`name`, "news");
  if (!newschannel) return message.channel.send("Couldn't find news channel.");

  newschannel.send(announceEmbed);
}

module.exports.help = {
  name:"announce"
}
