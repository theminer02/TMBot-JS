const Discord = require("discord.js");
const client = new Discord.Client();
const keepAlive = require("./server");

const botVersion = "v3.0-public";

// ---

function showHelp() {
  commands =
    "__The commands:__\n\n**$help** - Shows this list of commands.\n**$testbot** - Checks if the bot is online.\n**$dl <project>** - Provides the download link for the specified project. Use `$dl list` for a list of projects.\n**$faq <topic>** - Answers some general questions. Use `$faq list` for a list of topics.";
  return commands;
}

function generatePing() {
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
      name: "Subscribe!",
      type: "PLAYING",
      url: "https://www.youtube.com/theminer_02",
    },
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  // ---------------------------------------------------------------
  // $help - Shows the list of commands.
  // ---------------------------------------------------------------
  if (msg.content === "$help") {
    msg.channel.send(showHelp());
    console.log("help - Answer sent");
    return;
  }

  // ---------------------------------------------------------------
  // $testbot - Checks if the bot is online.
  // ---------------------------------------------------------------
  if (msg.content === "$testbot") {
    msg.channel.send("Bot is online. **" + generatePing() + "**");
    console.log("testbot - Answer sent");
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

    if (project[1] == "MedievalCity") {
      msg.channel.send(dl_medieval);
    } else if (project[1] == "TM-Zoo") {
      msg.channel.send(dl_zoo);
    } else if (project[1] == "Hytale") {
      msg.channel.send(dl_hytale);
    } else if (project[1] == "list") {
      msg.channel.send(dl_list);
      console.log("dl - Project List sent");
      return;
    } else {
      msg.channel.send(dl_unknown);
      console.log("dl - Unknown Project sent");
      return;
    }

    console.log("dl - " + project[1] + " sent");
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
      "**__Bot__**\n**Commands:** Use `$help`\n**General Info:** I made this bot on my own and its completely customized for me. You can't use it on your own server.\n**Version:** " +
      botVersion +
      "\n**Numbers:** ~200 lines of code, ~10 hours of work";
    faq_donate =
      "**__Donate__**\nI don't know why you would want to donate something, but if you do, here you go:\n<https://streamlabs.com/theminer_02/tip>";
    faq_list =
      "**The available topics are:**\n- Invite\n- Links\n- Bot\n- Donate";
    faq_unknown =
      "**__Unknown Topic__**\nUse `$faq list` for a list of the topics.";

    var topic = msg.content.split(" ");
    // console.log(faqtopic);

    if (topic[1] == "Invite") {
      msg.channel.send(faq_invite);
    } else if (topic[1] == "Links") {
      msg.channel.send(faq_links);
    } else if (topic[1] == "Bot") {
      msg.channel.send(faq_bot);
    } else if (topic[1] == "Donate") {
      msg.channel.send(faq_donate);
    } else if (topic[1] == "list") {
      msg.channel.send(faq_list);
      console.log("faq - Topic List sent");
      return;
    } else {
      msg.channel.send(faq_unknown);
      console.log("faq - Unknown Topic sent");
      return;
    }

    console.log("faq - " + topic[1] + " sent");
    return;
  }

  // ---------------------------------------------------------------
  // $ - Unknown commands
  // ---------------------------------------------------------------
  if (msg.content.startsWith("$")) {
    msg.channel.send("```I dont know this command. Try $help```");
    console.log("Unknown command - Answer sent");
    return;
  }

  // ---------------------------------------------------------------
  // Add reaction to messages that contain TM-Bot
  // ---------------------------------------------------------------
  if (msg.mentions.has(client.user.id)) {
    if (msg.content.includes("@here") || msg.content.includes("@everyone")) {
      return;
    }
    msg.react("👀");
    console.log("Added a reaction");
    return;
  }
});

// ---

keepAlive();
client.login(process.env.TOKEN);
