const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('info')
	.setDescription('Gives some simple information for the specified topic')
	.addStringOption(option =>
		option.setName('topic')
			.setDescription('Specify the topic')
			.setRequired(true)
			.addChoice('Invite', 'info_invite')
			.addChoice('Links', 'info_links')
			.addChoice('Bot', 'info_bot')
			.addChoice('Donate', 'info_donate')
  ),

	execute: async (interaction) => {
    const topic = interaction.options.getString('topic');
    const botVersion = "v5.0-public";
    
    text_invite =
      "**__Discord__**\n**User:** TheMiner_02#4863\n**Invite:** https://discord.gg/hrFSdAr23T";
    text_links =
      "**__My social media__**\n**YouTube:** <https://youtube.com/theminer02>\n**Instagram:** <https://instagram.com/theminer_02>\n**Twitter:** <https://twitter.com/theminer_02>\n**PlanetMinecraft:** <https://planetminecraft.com/member/theminer02>\n**Website:** <https://theminer02.com/>\n**Twitch *(german)*:** <https://www.twitch.tv/theminer_02>";
    text_bot =
      "**__Bot__**\n**Commands:** Use `/help`\n**General Info:** I made this bot on my own and its completely customized for me. You can't use it on your own server.\n**Version:** " + botVersion + "\n**Nerd stuff:** ~350 lines of code, ~14 hours of work - I'm using `discord.js v13.2.0` & the bot is currently hosted on Replit\n**Uptime:** <https://stats.uptimerobot.com/rVzlqsrnNL/787785032>";
    text_donate =
      "**__Donate__**\nI don't know why you would want to donate something, but if you do, here you go:\n<https://streamlabs.com/theminer_02/tip>";
    
    switch (topic) {
    case "info_invite":
      await interaction.reply(text_invite);
      break;
    case "info_links":
      await interaction.reply(text_links);
      break;
    case "info_bot":
      await interaction.reply(text_bot);
      break;
    case "info_donate":
      await interaction.reply(text_donate);
      break;
    default:
      await interaction.reply("Something went wrong!");
      break;
    }

    console.log("info - Answer sent (" + topic + ")");
	},
};