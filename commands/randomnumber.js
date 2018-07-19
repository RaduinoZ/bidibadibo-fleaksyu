const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  let evalEmbed2 = new Discord.RichEmbed()
      .setTitle("Random Number Generator")
      .setColor("#F51414")
      .addField('Your random number: ', Math.floor(Math.random() * 100))
    
  message.channel.send(evalEmbed2);
}

module.exports.help = {
  name:"randomnumber"
}
