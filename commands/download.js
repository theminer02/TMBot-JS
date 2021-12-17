const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('download')
	.setDescription('Get downloads for my projects')
	.addStringOption(option =>
		option.setName('project')
			.setDescription('Specify the project')
			.setRequired(true)
			.addChoice('Medieval City', 'dl_medievalcity')
			.addChoice('TM-Zoo', 'dl_tmzoo')
			.addChoice('Hytale Modpack', 'dl_hytale')
			.addChoice('TM-Bay', 'dl_tmbay')
  ),

	async execute(interaction) {
    const project = interaction.options.getString('project');
    
    text_medievalcity =
      "**Medieval City**\nTrailer: https://youtu.be/UdZT_NrsbzQ\nWebsite: <https://theminer02.com/downloads>\nPlanetMinecraft: <https://bit.ly/3sScNG5>\nDirect: <https://bit.ly/32QA68T>";
    text_tmzoo =
      "**TM-Zoo**\nTrailer: https://youtu.be/Beqo3e6oG9c\n*There is currently no download available*";
    text_hytale =
      "**Hytale Modpack**\nVideo: https://youtu.be/oPFat5Vholk\nWebsite: <https://theminer02.com/downloads>\nDirect: <https://bit.ly/32UXoKS>";
    text_tmbay = "**TM-Bay**\nFirst episode: https://youtu.be/Ek3i-mjWk7s\n*There is currently no download available*";
    
    switch (project) {
    case "dl_medievalcity":
      await interaction.reply(text_medievalcity);
      break;
    case "dl_tmzoo":
      await interaction.reply(text_tmzoo);
      break;
    case "dl_hytale":
      await interaction.reply(text_hytale);
      break;
    case "dl_tmbay":
      await interaction.reply(text_tmbay);
      break;
    default:
      await interaction.reply("Something went wrong!");
      break;
    }

    console.log("download - Answer sent (" + project + ")");
	},
};