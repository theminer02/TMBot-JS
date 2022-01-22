const { SlashCommandBuilder } = require("@discordjs/builders");

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
        .addChoice("Discord", "stats_dc")
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
          value: formatNumber(yt_subs),
        },
        {
          name: "Total videos",
          value: formatNumber(yt_videos),
        },
        {
          name: "Total views",
          value: formatNumber(yt_views),
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "© TheMiner_02 2022",
        icon_url:
          "https://github.com/theminer02/TMBot-JS/blob/main/assets/tm-logo.png?raw=true",
      },
    };

    const text_dc = {
      color: 0x5865f2,
      title: "Discord Stats",
      author: {
        name: "TM-Bot",
        icon_url:
          "https://github.com/theminer02/TMBot-JS/blob/main/assets/profile.png?raw=true",
        url: "https://theminer02.com",
      },
      thumbnail: {
        url: "https://cdn.discordapp.com/icons/310662617981255682/4e5086005d00c1cd057b86b9d721dea8.webp",
        dynamic: true,
      },
      fields: [
        {
          name: "Members (Bots)",
          value: formatNumber(dc_members) + " (" + dc_bots + ")",
        },
        {
          name: "Total channels",
          value: dc_channels,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "© TheMiner_02 2022",
        icon_url:
          "https://github.com/theminer02/TMBot-JS/blob/main/assets/tm-logo.png?raw=true",
      },
    };

    switch (media) {
      case "stats_yt":
        await interaction.reply({ embeds: [text_yt] });
        break;
      case "stats_dc":
        await interaction.reply({ embeds: [text_dc] });
        break;
      default:
        await interaction.reply("Something went wrong!");
        break;
    }

    console.log("stats - Answer sent (" + media + ")");
  },
};
