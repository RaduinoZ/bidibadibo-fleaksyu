const Discord = require("discord.js");
const Config = require("../config.json");
const fortclient = require('fortnite');
const ft = new fortclient(process.env.FORTNITEAPI);

module.exports.run = async (client, message, args) => {

    try {
        let infoEmbed = new Discord.RichEmbed()
            .setTitle("Command: /fortnite")
            .setColor("#FFDF00")
            .setDescription("**Description:** Shows fortnite stats of any player\n**Usage:** /fortnite [user] [platform]\n**Examples:**\n  /fortnite Ninja Pc");


        let username = args[0];
        let platform = args[1] || 'pc';

        if (!username) return message.channel.send(infoEmbed);
        if (!platform) return message.channel.send(infoEmbed);

        let data = ft.user(username, platform).then(data => {

            let stats = data.stats;
            let lifetime = stats.lifetime;


            let score = lifetime[6]['Score'];
            let mPlayed = lifetime[7]['Matches Played'];
            let Wins = lifetime[8]['Wins'];
            let WinPercentage = lifetime[9]['Win%'];
            let Kills = lifetime[10]['Kills'];
            let kd = lifetime[11]['K/d'];

            let FortniteEmbed = new Discord.RichEmbed()
                .setTitle("Fortnite Stats")
                .setAuthor(data.username)
                .setColor("#F51414")
                .addField("Wins", Wins, true)
                .addField("Kills", Kills, true)
                .addField("Matches Played", mPlayed, true)
                .addField("Win Rate", WinPercentage, true)
                .addField("K/D", kd, true)
                .addField("Score", score, true);

            message.channel.send(FortniteEmbed)

        });

    } catch (error) {
        message.channel.send("An error occured while getting the stats!");
        console.log(error)

    }
}

module.exports.help = {
    name: "fortnite"
}