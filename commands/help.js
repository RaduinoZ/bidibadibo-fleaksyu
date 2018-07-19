const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  message.channel.sendMessage("Help Neuron sent to your DMs!");
  
    var embed = new Discord.RichEmbed()
      .setTitle("Help Neuron")
      .addField('Help', "Does this logic..?")
      .addField('Serverinfo', "Some info that is about yer server.")
      .addField('Userinfo', "Info about ya.", true)
      .addField('Say', "Say something - Requires a role with the permission manage messages.")
      .addField('Ban', "Ban a naughty boi - Requires a role with the permission manage roles.")
      .addField('Kick', "Kick em - Requires a role with the permission manage messages.")
      .addField('Prune', "Prune messages - Requires a role with the permission manage messages.")
      .addField('Randomnumber', "Generates a random number.")
      .addField('Report', "Report some guy.")
      .addField('Tempmute', "Close someone's mouth.")
      .addField('Urban', "Just a random dictionary. Is it?")
      .addField('Skin', "Get a minecraft skin by name")
      .setColor("#F51414")

  message.author.sendEmbed(embed)
  
  
}

module.exports.help = {
  name:"help"
}
