const Discord = require("discord.js");
const client = new Discord.Client();

const botVersion = "v3.0-dev";

// ---

function showHelp() {
  commands =
    "__The commands:__\n\n**$help** - Shows this list of commands.\n**$testbot** - Checks if the bot is online.\n**$dl <project>** - Provides the download link for the specified project. Use `$dl list` for a list of projects.\n**$stats <type>** - Provides stats for the specified media. Use `$stats list` for a list.\n**$faq <topic>** - Answers some general questions. Use `$faq list` for a list of topics.";
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
  }

  // ---------------------------------------------------------------
  // $testbot - Checks if the bot is online.
  // ---------------------------------------------------------------
  if (msg.content === "$testbot") {
    msg.channel.send("Bot is online. **" + generatePing() + "**");
    console.log("testbot - Answer sent");
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
    console.log(project);

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
});

// ---

client.login(process.env.TOKEN);
