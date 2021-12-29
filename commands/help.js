const { SlashCommandBuilder } = require('@discordjs/builders');

function showHelp() {
  commands =
    "__The commands:__\n\n**/help** - Shows this list of commands.\n**/testbot** - Checks if the bot is online.\n**/dl <project>** - Provides the download link for the specified project.\n**/info <topic>** - Gives some simple information for the specified topic.";
  return commands;
}

module.exports = {
	data: new SlashCommandBuilder()
	.setName('help')
	.setDescription('Shows a list of all commands'),
	execute: async (interaction) => {
		await interaction.reply(showHelp());
    console.log("help - Answer sent");
	},
};
