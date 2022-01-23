const { SlashCommandBuilder } = require("@discordjs/builders");
const https = require('https');

const channelid = "UCDgBkUJDqnYlsHOd9NO0UhQ"

// -----------------------------
// Data for YouTube
// -----------------------------

function yt_getSubCount() {
  https.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + channelid + "&key=" + process.env.GOOGLEAPI, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      console.log('data:', d);
      console.log(d['items'] /*[0]['statistics']['subscriberCount'] */)
    });

  }).on('error', (e) => {
    console.error(e);
  });

  // return (data['items'][0]['statistics']['subscriberCount'])
}

// -----------------------------

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Get stats for my social media")
    .addStringOption((option) =>
      option
        .setName("media")
        .setDescription("Specify the social media")
        .setRequired(true)
        .addChoice("YouTube", "stats_yt")
    ),

  execute: async (interaction) => {
    const media = interaction.options.getString("media");

    const text_yt = {
      color: 0xff0000,
      title: "YouTube Stats",
      author: {
        name: "TM-Bot",
        icon_url:
          "https://github.com/theminer02/TMBot-JS/blob/main/assets/profile.png?raw=true",
        url: "https://theminer02.com",
      },
      thumbnail: {
        url: "https://yt3.ggpht.com/cAxgiHrxf3PuAUSoPcjo2H03dcra2nf0YM_Tb8wTrE13Bntin_alOqyIzibhHCJ9jB7gJEHG3g=s88-c-k-c0x00ffffff-no-rj",
        dynamic: true,
      },
      fields: [
        {
          name: "Subscribers",
          value: yt_getSubCount(),
        },
        {
          name: "Total videos",
          value: "123,123,123",
        },
        {
          name: "Total views",
          value: "123,123,123",
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "© TheMiner_02 2022",
        icon_url:
          "https://github.com/theminer02/TMBot-JS/blob/main/assets/tm-logo.png?raw=true",
      },
    };

    const text_inProgress = {
      color: 0xff0000,
      title: "Stats",
      author: {
        name: "TM-Bot",
        icon_url:
          "https://github.com/theminer02/TMBot-JS/blob/main/assets/profile.png?raw=true",
        url: "https://theminer02.com",
      },
      fields: [
        {
          name: "Not done",
          value: "This feature is not done yet.",
        },
      ],
    };

    switch (media) {
      case "stats_yt":
        await interaction.reply({ embeds: [text_inProgress] });
        console.log(yt_getSubCount());
        break;
      default:
        await interaction.reply("Something went wrong!");
        break;
    }

    console.log("stats - Answer sent (" + media + ")");
  },
};
