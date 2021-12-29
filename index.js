const { REST } = require('@discordjs/rest');
const { Client, Collection, Intents } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const keepAlive = require("./server");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS],
});

const botVersion = "v4.9-public";

// ---

const blocksjson = '[{"name":"Magma","url":"https://i.imgur.com/qFhWOB7.gif"},{"name":"Grass","url":"https://i.imgur.com/Bs2bdoj.png"},{"name":"Amethyst","url":"https://i.imgur.com/pwH2QoM.png"},{"name":"Ancient Debris","url":"https://i.imgur.com/6549b5t.png"},{"name":"Beehive","url":"https://i.imgur.com/KKyapfN.png"},{"name":"Cactus","url":"https://i.imgur.com/4vcKCoZ.png"},{"name":"Command Block","url":"https://i.imgur.com/lMYHJ2P.png"},{"name":"Crimson","url":"https://i.imgur.com/CypyIoV.png"},{"name":"Cut Coper","url":"https://i.imgur.com/kwyAEzC.png"},{"name":"Deepslate Tiles","url":"https://i.imgur.com/V8u61F5.png"},{"name":"Dried Kelp","url":"https://i.imgur.com/xcdMWfL.png"},{"name":"Ender Chest","url":"https://i.imgur.com/LwXFOlr.png"},{"name":"Furnace","url":"https://i.imgur.com/5gT85AR.png"},{"name":"Glowstone","url":"https://i.imgur.com/U7Egv7A.png"},{"name":"Light Blue Glazed Terracotta","url":"https://i.imgur.com/Y1HQHL6.png"},{"name":"Moss","url":"https://i.imgur.com/3BWZ2mT.png"},{"name":"Packed Ice","url":"https://i.imgur.com/ofG90G8.png"},{"name":"Quartz Pillar","url":"https://i.imgur.com/Q799f74.png"},{"name":"Red Mushroom","url":"https://i.imgur.com/iiU8eeb.png"},{"name":"Redstone Lamp","url":"https://i.imgur.com/B4FMrPG.png"},{"name":"TNT","url":"https://i.imgur.com/s4h6h9t.png"},{"name":"USB-Charger","url":"https://i.imgur.com/YjTtuE0.png"},{"name":"Yellow Coral","url":"https://i.imgur.com/1yMILsa.png"}]'

// ---

function showHelp() {
  return "Please use /help";
}

function getPing() {
  // its not real o.O shhh
  generatedPing = Math.floor(Math.random() * 44 + 1);
  ping = generatedPing + "ms";
  return ping;
}

function useSlashCommands() {
  text = "My bot will stop responding to the `$` prefix on **December 31st 2021**\nTry out slash commands!\n---";
  return text;
}

function getRandomBlock() {
  var blocks = JSON.parse(blocksjson);
  var i = Math.floor(Math.random() * (22 - 0 + 1) + 0)
  console.log("Block selected: " + blocks[i].name);
  return blocks[i].url;
}

// ---

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  client.user.setPresence({
    status: "online",
    activities: [{
      name: "/help",
      type: "LISTENING",
      url: "https://www.youtube.com/theminer02",
    }],
  });
})

// ---------------------------------------------------------------
// Slash commands
// ---------------------------------------------------------------

client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('INFO: Refreshing slash-commands...');

		await rest.put(
			Routes.applicationGuildCommands(process.env.APPID, process.env.GUILD),
			{ body: commands },
		);

		console.log('INFO: Slash-Commands refreshed');
	} catch (error) {
		console.error(error);
	}
})();

// ---
// Respond to Slash Commands
// ---

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// ---
// Remove on 31.12.2021 - Respond to $ prefix
// ---

client.on("messageCreate", async msg => {
  if (msg.author.bot) return;
  // ---------------------------------------------------------------
  // $help - Shows the list of commands.
  // ---------------------------------------------------------------
  if (msg.content === "$help") {
    msg.channel.send(useSlashCommands());
    msg.channel.send(showHelp());
    console.log("help - Answer sent (old prefix)");
    return;
  }

  // ---------------------------------------------------------------
  // $testbot - Checks if the bot is online.
  // ---------------------------------------------------------------
  if (msg.content === "$testbot") {
    msg.channel.send(useSlashCommands());
    msg.channel.send("Bot is online. **" + getPing() + "**");
    console.log("testbot - Answer sent (old prefix)");
    return;
  }

  // ---------------------------------------------------------------
  // $dl <project> - Provides the download link for the specified project.
  // ---------------------------------------------------------------
  if (msg.content.startsWith("$dl")) {
    msg.channel.send(useSlashCommands());
    // Projects:
    dl_medieval =
      "**Medieval City**\nTrailer: https://youtu.be/UdZT_NrsbzQ\nWebsite: <https://theminer02.com/downloads>\nPlanetMinecraft: <https://bit.ly/3sScNG5>\nDirect: <https://bit.ly/32QA68T>";
    dl_zoo =
      "**TM-Zoo**\nTrailer: https://youtu.be/Beqo3e6oG9c\n*There is currently no download available*";
    dl_hytale =
      "**Hytale Modpack**\nVideo: https://youtu.be/oPFat5Vholk\nWebsite: <https://theminer02.com/downloads>\nDirect: <https://bit.ly/32UXoKS>";
    dl_list =
      "**The available projects are:**\n- MedievalCity\n- TM-Zoo\n- Hytale";
    dl_unknown =
      "**Unknown Project**\nUse `$dl list` for a list of the projects.";

    var project = msg.content.split(" ");
    // console.log(project);

    if (project[1] == "MedievalCity" || project[1] == "Medievalcity" || project[1] == "medievalcity") {
      msg.channel.send(dl_medieval);
    } else if (project[1] == "TM-Zoo" || project[1] == "tmzoo" || project[1] == "tm-zoo") {
      msg.channel.send(dl_zoo);
    } else if (project[1] == "Hytale" || project[1] == "hytale") {
      msg.channel.send(dl_hytale);
    } else if (project[1] == "List" || project[1] == "list") {
      msg.channel.send(dl_list);
      console.log("dl - Project List sent (old prefix)");
      return;
    } else {
      msg.channel.send(dl_unknown);
      console.log("dl - Unknown Project sent (old prefix)");
      return;
    }

    console.log("dl - " + project[1] + " sent (old prefix)");
    return;
  }

  // ---------------------------------------------------------------
  // $faq <topic> - Answers some general questions.
  // ---------------------------------------------------------------
  if (msg.content.startsWith("$info")) {
    msg.channel.send(useSlashCommands());
    // Topics:
    info_invite =
      "**__Discord__**\n**User:** TheMiner_02#4863\n**Invite:** https://discord.gg/hrFSdAr23T";
    info_links =
      "**__My social media__**\n**YouTube:** <https://youtube.com/theminer02>\n**Instagram:** <https://instagram.com/theminer_02>\n**Twitter:** <https://twitter.com/theminer_02>\n**PlanetMinecraft:** <https://planetminecraft.com/member/theminer02>\n**Website:** <https://theminer02.com/>\n**Twitch *(german)*:** <https://www.twitch.tv/theminer_02>";
    info_bot =
      "**__Bot__**\n**Commands:** Use `/help`\n**General Info:** I made this bot on my own and its completely customized for me. You can't use it on your own server.\n**Version:** " +
      botVersion +
      "\n**Nerd stuff:** ~500 lines of code, ~13 hours of work - I'm using `discord.js v13.2.0` & the bot is currently hosted on Replit\n**Uptime:** <https://stats.uptimerobot.com/rVzlqsrnNL/787785032>";
    info_donate =
      "**__Donate__**\nI don't know why you would want to donate something, but if you do, here you go:\n<https://streamlabs.com/theminer_02/tip>";
    info_list =
      "**The available topics are:**\n- Invite\n- Links\n- Bot\n- Donate";
    info_unknown =
      "**__Unknown Topic__**\nUse `$info list` for a list of the topics.";

    var topic = msg.content.split(" ");
    // console.log(faqtopic);

    if (topic[1] == "Invite" || topic[1] == "invite") {
      msg.channel.send(info_invite);
    } else if (topic[1] == "Links" || topic[1] == "links") {
      msg.channel.send(info_links);
    } else if (topic[1] == "Bot" || topic[1] == "bot") {
      msg.channel.send(info_bot);
    } else if (topic[1] == "Donate" || topic[1] == "donate") {
      msg.channel.send(info_donate);
    } else if (topic[1] == "List" || topic[1] == "list") {
      msg.channel.send(info_list);
      console.log("info - Topic List sent (old prefix)");
      return;
    } else {
      msg.channel.send(info_unknown);
      console.log("info - Unknown Topic sent (old prefix)");
      return;
    }

    console.log("info - " + topic[1] + " sent (old prefix)");
    return;
  }

  // ---------------------------------------------------------------
  // $TMdev-int_welcome - Test welcome message
  // ---------------------------------------------------------------
  if (msg.content.startsWith("$TMdev-int_welcome")) {
    member = msg.guild.members.cache.get('310473472575012865');
    
    const welcomeEmbed = {
    color: 0xff8000,
    title: 'New member!',
    author: {
      name: 'TM-Bot',
      icon_url: 'https://github.com/theminer02/TMBot-JS/blob/main/profile.png?raw=true',
      url: 'https://theminer02.com',
    },
    description: "👋 Welcome <@" + member + "> to the **TheMiner_02** discord server!",
    thumbnail: {
      url: getRandomBlock(),
      dynamic: true,
    },
    fields: [
      {
        name: 'Information',
        value: 'Make sure to read the <#324243990977183747>',
      },
    ],
    timestamp: new Date(),
    footer: {
      text: '© TheMiner_02 2021',
      icon_url: 'https://github.com/theminer02/TMBot-JS/blob/main/tm-logo.png?raw=true',
    },
  }
  client.channels.cache.get('827895336898658324').send({ embeds: [welcomeEmbed] });
  console.log("Sent welcome message");
  return;
  };
  
  // ---------------------------------------------------------------
  // $ - Unknown commands
  // ---------------------------------------------------------------
  if (msg.content.startsWith("$")) {
    msg.channel.send(useSlashCommands());
    msg.channel.send("```I dont know this command. Try /help```");
    console.log("Unknown command - Answer sent");
    return;
  }

  // ---------------------------------------------------------------
  // Add reaction to messages that contain TM-Bot
  // ---------------------------------------------------------------
  if (
    msg.mentions.has(client.user.id) ||
    msg.content.includes("tmbot") ||
    msg.content.includes("tm-bot") ||
    msg.content.includes("TM-Bot")
  ) {
    if (msg.content.includes("@here") || msg.content.includes("@everyone")) {
      return;
    }
    msg.react("👀");
    console.log("Added a reaction");
    return;
  }
  
  // ---------------------------------------------------------------
  // Add voting options & thread to suggestions
  // ---------------------------------------------------------------
  if (msg.channel == 912433891976040498  || msg.channel == 914098259784531989) {
    
    // voting options
    msg.react("🔼");
    msg.react("🔽");
    console.log("Suggestion - Added voting options");

    var msg_split = msg.content.split(" ")
    var thread_name = msg_split[0] + " - " + msg_split[1] + " " + msg_split[2]

    createTread()

    async function createTread() {
      const thread = await msg.startThread({
          name: thread_name,
          autoArchiveDuration: 1440,
          // type: 'GUILD_PRIVATE_THREAD',
          reason: 'Create thread for suggestion',
        });
      console.log(`Suggestion - Created thread: ${thread.name}`);
    }
  return;
  };
});
  
// ---------------------------------------------------------------
// Send welcome message
// ---------------------------------------------------------------

client.on('guildMemberAdd', member => {
  const welcomeEmbed = {
    color: 0xff8000,
    title: 'New member!',
    author: {
      name: 'TM-Bot',
      icon_url: 'https://github.com/theminer02/TMBot-JS/blob/main/profile.png?raw=true',
      url: 'https://theminer02.com',
    },
    description: "👋 Welcome <@" + member + "> to the **TheMiner_02** discord server!",
    thumbnail: {
      url: getRandomBlock(),
      dynamic: true,
    },
    fields: [
      {
        name: 'Information',
        value: 'Make sure to read the <#324243990977183747>',
      },
    ],
    timestamp: new Date(),
    footer: {
      text: '© TheMiner_02 2021',
      icon_url: 'https://github.com/theminer02/TMBot-JS/blob/main/tm-logo.png?raw=true',
    },
  };

client.channels.cache.get('826034078623989820').send({ embeds: [welcomeEmbed] });
console.log("Sent welcome message");
return;

},)

// ---

keepAlive();
client.login(process.env.TOKEN);
