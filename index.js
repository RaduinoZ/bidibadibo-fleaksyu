const Discord = require("discord.js");

const client = new Discord.Client();

const ms = require("ms");

const config = require("./config.json");

const token = require("./token.json");

client.on("ready", async () => {

    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds. At ` + new Date());

    client.user.setActivity("with fleaks help!", {
        type: "PLAYING"
    });


});

client.on('guildMemberAdd', member => {

    let channel = member.guild.channels.find('name', 'join-log');
    let embed = new Discord.RichEmbed()
        .setDescription('Welcome!')
        .setColor('RANDOM')
        .addField(':100:', `Welcome to Fleakes Bot, ${member}!`)
        .setFooter("Flakes")
        .setTimestamp()

    channel.sendEmbed(embed);
});


client.on("message", async message => {


    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "say") {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot execute this command!");

        const sayMessage = args.join(" ");

        message.delete().catch(O_o => {});

        message.channel.send(sayMessage);
    }

    if (command === `report`) {

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!rUser) return message.channel.send("Couldn't find user.");
        let rreason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
            .setDescription("Report")
            .setColor("#E51313")
            .addField("Reported user", `${rUser} with ID: ${rUser.id}`)
            .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
            .addField("Channel", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", rreason);

        let reportschannel = message.guild.channels.find(`name`, "logs");
        if (!reportschannel) return message.channel.send("Couldn't find logs channel.");


        message.delete().catch(O_o => {});
        reportschannel.send(reportEmbed);

    }

    if (command === `ban`) {

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

    if (command === `kick`) {

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!kUser) return message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot execute this command!");
        if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

        let kickEmbed = new Discord.RichEmbed()
            .setDescription("Kick")
            .setColor("#3342FF")
            .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
            .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Kicked In", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", kReason);

        let kickChannel = message.guild.channels.find(`name`, "logs");
        if (!kickChannel) return message.channel.send("Can't find logs channel.");

        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);

        return;
    }

    if (command === "serverinfo") {

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
                    text: "Flakes"
                }
            }
        });
    }

    if (command === `tempmute`) {

        let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!tomute) return message.reply("Couldn't find user.");
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot execute this command!");
        if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute the user!");
        let muterole = message.guild.roles.find(`name`, "muted");
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "muted",
                    color: "#000000",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
        }
        let mutetime = args[1];
        if (!mutetime) return message.reply("You didn't specify a time!");

        await (tomute.addRole(muterole.id));
        message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

        setTimeout(function() {
            tomute.removeRole(muterole.id);
            message.channel.send(`<@${tomute.id}> has been unmuted!`);
        }, ms(mutetime));
    }

    if (command === `prune`) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot execute this command!");
        if (!args[0]) return message.channel.send("You didn't specify the amount of messages to delete!");
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`Pruned ${args[0]} messages.`);
        });
    }

    if (command === `announce`) {
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

    if (command === "eval") {
        if (message.author.id !== config.ownerID || config.ownerID2) return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), {
                code: "xl"
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }

    function clean(text) {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }

    if (command === "info") {

        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Information",

                description: "Hello, I'm Flakes! The flakiest bot of them all.",

                fields: [{
                        name: "Commands",

                        value: "To see all my commands type flakes help!"
                    },
                    {
                        name: "Official Server",

                        value: "My official server is Flakes Bot!"
                    },
                    {
                        name: "Credits",

                        value: "I was created by Raduino#0006."
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: "Fleakes"
                }
            }
        });
    }
});

client.login(token.bottoken);
