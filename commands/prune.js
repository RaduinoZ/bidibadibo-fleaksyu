const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot execute this command!");
  if (!args[0]) return message.channel.send("You didn't specify the amount of messages to delete!");
  message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Pruned ${args[0]} messages.`);
  });
}

module.exports.help = {
  name:"prune"
}
