const Discord = require("discord.js");
const snekfetch = require('snekfetch');

module.exports.run = async (client, message, args) => {

    const nameMessage = args.join(" ");

    try {
        const {
            body: profileJson
        } = await snekfetch.get('https://api.mojang.com/users/profiles/minecraft/' + nameMessage);
        if (!profileJson.toString())
            return message.channel.send("Skin not found!");
        const {
            body: imageBuffer
        } = await snekfetch.get(`https://crafatar.com/renders/body/${profileJson.id}`);
        const eb = new Discord.RichEmbed()
            .setTitle(nameMessage + "'s skin!")
            .attachFile({
                attachment: imageBuffer,
                name: nameMessage + '.png'
            })
            .setImage('attachment://' + nameMessage + '.png')
        message.channel.send(eb);
    } catch (error) {
        message.channel.sendMessage("An error occured while getting your skin!");
        console.log(error)
    }
}

module.exports.help = {
    name: "skin"
}