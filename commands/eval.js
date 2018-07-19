const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {

  if (message.author.id !== config.ownerID) return;
  try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
    
      let evalEmbed2 = new Discord.RichEmbed()
      .setDescription("Eval result - Good")
      .setColor("#F51414")
      .addField('Output: ', clean(evaled))
    
  message.channel.send(evalEmbed2);
  } catch (err) {
      let evalEmbed = new Discord.RichEmbed()
      .setDescription("Eval result - Error")
      .setColor("#f40909")
      .addField('Output: ', clean(err))
    
  message.channel.send(evalEmbed);
  }

function clean(text) {
  if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
}

module.exports.help = {
  name:"eval"
}