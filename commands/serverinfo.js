const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  function checkBots(guild) {
      let botCount = 0;
      guild.members.forEach(member => {
          if (member.user.bot) botCount++;
      });
      return botCount;
  }

  function checkMembers(guild) {
      let memberCount = 0;
      guild.members.forEach(member => {
          if (!member.user.bot) memberCount++;
      });
      return memberCount;
  }

  message.channel.send({
      embed: {
          color: 3447003,
          author: {
              name: message.guild.name,
              icon_url: message.guild.iconURL
          },
          title: message.guild.name + " Server Information",

          fields: [{
                  name: "Server Owner",

                  value: "This server's owner is: " + message.guild.owner,
              },
              {
                  name: "Server Region",

                  value: "This server's region is: " + message.guild.region,
              },
              {
                  name: "Channel Count",

                  value: "This server has " + message.guild.channels.size + " channels."
              },
              {
                  name: "Total Members",

                  value: "This server has " + message.guild.memberCount + " members."
              },
              {
                  name: "Users",

                  value: "This server has " + checkMembers(message.guild) + " users."
              },
              {
                  name: "Bots",

                  value: "This server has " + checkBots(message.guild) + " bots."
              },
              {
                  name: "Verification Level",

                  value: "This server's verification is:  " + message.guild.verificationLevel
              },
              {
                  name: "Server creation date",

                  value: "This server was created at:  " + message.guild.createdAt
              }
          ],
          timestamp: new Date(),
          footer: {
              text: "Fleaks"
          }
      }
  });
}

module.exports.help = {
  name:"serverinfo"
}
