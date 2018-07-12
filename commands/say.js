const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot execute this command!");

  const sayMessage = args.join(" ");

  message.delete().catch(O_o => {});

  message.channel.send(sayMessage);
}

module.exports.help = {
  name:"say"
}
