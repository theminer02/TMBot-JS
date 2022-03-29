const { REST } = require('@discordjs/rest');
const { Client, Collection, Intents } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const keepAlive = require("./server");
const infoData = require('./info.json')

const botVersion = infoData.botVersion;
const discordjs = infoData.discordjs;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS],
});

// ---
// Blocks for welcome message
// ---

const blocksjson = '[{"name":"Magma","url":"https://i.imgur.com/qFhWOB7.gif"},{"name":"Grass","url":"https://i.imgur.com/Bs2bdoj.png"},{"name":"Amethyst","url":"https://i.imgur.com/pwH2QoM.png"},{"name":"Ancient Debris","url":"https://i.imgur.com/6549b5t.png"},{"name":"Beehive","url":"https://i.imgur.com/KKyapfN.png"},{"name":"Cactus","url":"https://i.imgur.com/4vcKCoZ.png"},{"name":"Command Block","url":"https://i.imgur.com/lMYHJ2P.png"},{"name":"Crimson","url":"https://i.imgur.com/CypyIoV.png"},{"name":"Cut Coper","url":"https://i.imgur.com/kwyAEzC.png"},{"name":"Deepslate Tiles","url":"https://i.imgur.com/V8u61F5.png"},{"name":"Dried Kelp","url":"https://i.imgur.com/xcdMWfL.png"},{"name":"Ender Chest","url":"https://i.imgur.com/LwXFOlr.png"},{"name":"Furnace","url":"https://i.imgur.com/5gT85AR.png"},{"name":"Glowstone","url":"https://i.imgur.com/U7Egv7A.png"},{"name":"Light Blue Glazed Terracotta","url":"https://i.imgur.com/Y1HQHL6.png"},{"name":"Moss","url":"https://i.imgur.com/3BWZ2mT.png"},{"name":"Packed Ice","url":"https://i.imgur.com/ofG90G8.png"},{"name":"Quartz Pillar","url":"https://i.imgur.com/Q799f74.png"},{"name":"Red Mushroom","url":"https://i.imgur.com/iiU8eeb.png"},{"name":"Redstone Lamp","url":"https://i.imgur.com/B4FMrPG.png"},{"name":"TNT","url":"https://i.imgur.com/s4h6h9t.png"},{"name":"USB-Charger","url":"https://i.imgur.com/YjTtuE0.png"},{"name":"Yellow Coral","url":"https://i.imgur.com/1yMILsa.png"}]'

function getRandomBlock() {
  var blocks = JSON.parse(blocksjson);
  var i = Math.floor(Math.random() * (22 - 0 + 1) + 0)
  console.log("Block selected: " + blocks[i].name);
  return blocks[i].url;
}

// ---
// Main
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

// Load slash commands from ./commands

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
// Execute on every message sent
// ---

client.on("messageCreate", async msg => {

  // ---------------------------------------------------------------
  // Automatically publish messages in #videonews
  // ---------------------------------------------------------------

  if (msg.channel == 325987106046345216) {
    msg.crosspost()
      .then(() => console.log('Published message: ' + msg.content))
      .catch(console.error);
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
  if (msg.channel == 912433891976040498 || msg.channel == 914098259784531989) {

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
      icon_url: 'https://github.com/theminer02/TMBot-JS/blob/main/assets/profile.png?raw=true',
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
        value: '- Make sure to read the <#324243990977183747>\n- Have fun!',
      },
    ],
    timestamp: new Date(),
    footer: {
      text: '© TheMiner_02 2022',
      icon_url: 'https://github.com/theminer02/TMBot-JS/blob/main/assets/tm-logo.png?raw=true',
    },
  };

  client.channels.cache.get('826034078623989820').send({ embeds: [welcomeEmbed] });
  console.log("Sent welcome message");
  return;
})

// ---------------------------------------------------------------
// Give standard roles after screening passed
// ---------------------------------------------------------------

client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.pending && !newMember.pending) {
    member.addRole("837710794287611916"); // Visitor
    member.addRole("865878054302646292"); // ────────| Level |────────
    member.addRole("865878747257634827"); // ────────| Other |────────
  }
});

// ---------------------------------------------------------------
// Log message edits
// ---------------------------------------------------------------

client.on('messageUpdate', (oldMessage, newMessage) => {
  const messageupdateEmbed = {
    color: 0x45b6fe,
    title: '📝 A message was updated',
    fields: [
      {
        name: 'Channel',
        value: "<#" + newMessage.channel + ">",
        inline: true,
      },
      {
        name: 'Author',
        value: "<@" + newMessage.author + ">",
        inline: true,
      },
      {
        name: 'Old content',
        value: "" + oldMessage.content + "",
        inline: false,
      },
      {
        name: 'Message ID',
        value: "[" + newMessage.id + "](https://discord.com/channels/" + newMessage.guildId + "/" + newMessage.channelId + "/" + newMessage.id + ")",
        inline: false,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: 'Audit-Log by TM-Bot',
      icon_url: "",
    },
  };

  if (newMessage.author.id != client.user.id) {
    client.channels.cache.get('510772850542510100').send({ embeds: [messageupdateEmbed] });
    console.log("Message updated in " + newMessage.channel.name);
    return;
  } else {
    return // Message sent by TM-Bot (Most certainly /testbot answer) -> do not log
  };
})

// ---------------------------------------------------------------
// Log deleted messages
// ---------------------------------------------------------------

client.on('messageDelete', message => {
  const messagedeleteEmbed = {
    color: 0xff1d18,
    title: '❌ A message was deleted',
    fields: [
      {
        name: 'Channel',
        value: "<#" + message.channel + ">",
        inline: true,
      },
      {
        name: 'Author',
        value: "<@" + message.author + ">",
        inline: true,
      },
      {
        name: 'Content',
        value: "" + message.content + "",
        inline: false,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: 'Audit-Log by TM-Bot',
      icon_url: "",
    },
  };
  
  client.channels.cache.get('510772850542510100').send({ embeds: [messagedeleteEmbed] });
  console.log("Message deleted in " + message.channel.name);
  return
})

// ---
// Start bot & log info
// ---

keepAlive();
console.log("---")
console.log("Bot version: " + botVersion)
console.log(discordjs)
console.log("---")
client.login(process.env.TOKEN);
