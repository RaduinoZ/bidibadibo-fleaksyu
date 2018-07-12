const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) return message.channel.send("Can't find user!");
  let bReason = args.join(" ").slice(22);
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You cannot execute this command!");
  if (bUser.hasPermission("MANAGE_ROLES")) return message.channel.send("That person can't be kicked!");

  let banEmbed = new Discord.RichEmbed()
      .setColor("#A533FF")
      .addField("Banned user", `${bUser} with ID ${bUser.id}`)
      .addField("Banned by", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Banned in the channel ", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", bReason);

  let incidentchannel = message.guild.channels.find(`name`, "logs");
  if (!incidentchannel) return message.channel.send("Can't find logs channel.");

  message.guild.member(bUser).ban(bReason);
  incidentchannel.send(banEmbed);

  return;
}

module.exports.help = {
  name:"ban"
}
