const { SlashCommandBuilder } = require("@discordjs/builders");

// -----------------------------
// Data for YouTube
// -----------------------------

// ...

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
          value: "123,123,123",
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

    switch (media) {
      case "stats_yt":
        await interaction.reply({ embeds: [text_yt] });
        break;
      default:
        await interaction.reply("Something went wrong!");
        break;
    }

    console.log("stats - Answer sent (" + media + ")");
  },
};
