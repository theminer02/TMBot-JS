const { SlashCommandBuilder } = require('@discordjs/builders');

// Store answer in variable

text_help = "__The commands:__\n\n**/help** - Shows this list of commands.\n**/testbot** - Checks if the bot is online.\n**/download <project>** - Provides the download link for the specified project.\n**/info <topic>** - Gives some simple information for the specified topic.";

// Create command & reply

module.exports = {
	data: new SlashCommandBuilder()
	.setName('help')
	.setDescription('Shows a list of all commands'),
	execute: async (interaction) => {
		await interaction.reply(text_help);
    console.log("help - Answer sent");
	},
};
