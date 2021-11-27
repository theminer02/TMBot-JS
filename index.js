const { Client, Intents } = require('discord.js');
const keepAlive = require("./server");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

const botVersion = "v4.2-public";

// ---

function showHelp() {
  commands =
    "__The commands:__\n\n**/help** - Shows this list of commands.\n**/testbot** - Checks if the bot is online.\n**$dl <project>** - Provides the download link for the specified project. Use `$dl list` for a list of projects.\n**$faq <topic>** - Answers some general questions. Use `$faq list` for a list of topics.";
  return commands;
}

function getPing() {
  generatedPing = Math.floor(Math.random() * 44 + 1);
  ping = generatedPing + "ms";
  return ping;
}

// ---

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  client.user.setPresence({
    status: "online",
    activity: {
      name: "Slash Commands!",
      type: "LISTENING",
      url: "https://www.youtube.com/theminer02",
    },
  });

  // ---------------------------------------------------------------
  // Slash commands
  // ---------------------------------------------------------------
  
  client.api.applications(process.env.APPID).guilds(process.env.GUILD).commands.post({
      data: {
          name: "testbot",
          description: "Checks if the bot is online"
          // possible options here e.g. options: [{...}]
      }
  });
  
  client.api.applications(process.env.APPID).guilds(process.env.GUILD).commands.post({
      data: {
          name: "help",
          description: "Shows a list of all commands"
          // possible options here e.g. options: [{...}]
      }
  });
  
  client.api.applications(process.env.APPID).guilds(process.env.GUILD).commands.post({
      data: {
          name: "download",
          description: "Get download links for my projects"
          // options: [{...}]
      }
  });

  // ---
  // Respond to Slash Commands
  // ---

  client.ws.on('INTERACTION_CREATE', async interaction => {
      const command = interaction.data.name.toLowerCase();
      const args = interaction.data.options;

  // $testbot - Checks if the bot is online.
      if (command === 'testbot'){ 
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: "Bot is online. **" + getPing() + "**"
            }
          }
        })
        console.log("testbot - Answer sent");
      }

  // $help - Shows the list of commands.
      if (command === 'help'){ 
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: showHelp()
            }
          }
        })
        console.log("help - Answer sent");
      }
  });
});

// ---
// Remove on 31.12.2021 - Respond to $ prefix
// ---

client.on("messageCreate", msg => {
  if (msg.author.bot) return;
  // ---------------------------------------------------------------
  // $help - Shows the list of commands.
  // ---------------------------------------------------------------
  if (msg.content === "$help") {
    msg.channel.send(showHelp());
    console.log("help - Answer sent (old prefix)");
    return;
  }

  // ---------------------------------------------------------------
  // $testbot - Checks if the bot is online.
  // ---------------------------------------------------------------
  if (msg.content === "$testbot") {
    msg.channel.send("Bot is online. **" + getPing() + "**");
    console.log("testbot - Answer sent (old prefix)");
    return;
  }

  // ---------------------------------------------------------------
  // $dl - Provides the download link for the specified project.
  // ---------------------------------------------------------------
  if (msg.content.startsWith("$dl")) {
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

    if (project[1] == "MedievalCity" || project[1] == "Medieval" || project[1] == "medieval") {
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
  // $faq - Answers some general questions.
  // ---------------------------------------------------------------
  if (msg.content.startsWith("$faq")) {
    // Topics:
    faq_invite =
      "**__Discord__**\n**User:** TheMiner_02#4863\n**Invite:** https://discord.gg/hrFSdAr23T";
    faq_links =
      "**__My social media__**\n**YouTube:** <https://youtube.com/theminer02>\n**Instagram:** <https://instagram.com/theminer_02>\n**Twitter:** <https://twitter.com/theminer_02>\n**PlanetMinecraft:** <https://planetminecraft.com/member/theminer02>\n**Website:** <https://theminer02.com/>\n**Twitch *(german)*:** <https://www.twitch.tv/theminer_02>";
    faq_bot =
      "**__Bot__**\n**Commands:** Use `/help`\n**General Info:** I made this bot on my own and its completely customized for me. You can't use it on your own server.\n**Version:** " +
      botVersion +
      "\n**Nerd stuff:** ~300 lines of code, ~12 hours of work - I'm using `discord.js v13.2.0` & the bot is currently hosted on Replit\n*Uptime:* <https://stats.uptimerobot.com/rVzlqsrnNL/787785032>";
    faq_donate =
      "**__Donate__**\nI don't know why you would want to donate something, but if you do, here you go:\n<https://streamlabs.com/theminer_02/tip>";
    faq_list =
      "**The available topics are:**\n- Invite\n- Links\n- Bot\n- Donate";
    faq_unknown =
      "**__Unknown Topic__**\nUse `$faq list` for a list of the topics.";

    var topic = msg.content.split(" ");
    // console.log(faqtopic);

    if (topic[1] == "Invite" || topic[1] == "invite") {
      msg.channel.send(faq_invite);
    } else if (topic[1] == "Links" || topic[1] == "links") {
      msg.channel.send(faq_links);
    } else if (topic[1] == "Bot" || topic[1] == "bot") {
      msg.channel.send(faq_bot);
    } else if (topic[1] == "Donate" || topic[1] == "donate") {
      msg.channel.send(faq_donate);
    } else if (topic[1] == "List" || topic[1] == "list") {
      msg.channel.send(faq_list);
      console.log("faq - Topic List sent (old prefix)");
      return;
    } else {
      msg.channel.send(faq_unknown);
      console.log("faq - Unknown Topic sent (old prefix)");
      return;
    }

    console.log("faq - " + topic[1] + " sent (old prefix)");
    return;
  }

  // ---------------------------------------------------------------
  // $ - Unknown commands
  // ---------------------------------------------------------------
  if (msg.content.startsWith("$")) {
    msg.channel.send("```I dont know this command. Try $help```");
    console.log("Unknown command - Answer sent (old prefix)");
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
  // Add voting options & tread to suggestions
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
  };
});

// ---

keepAlive();
client.login(process.env.TOKEN);