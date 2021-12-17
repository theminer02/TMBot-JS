const { SlashCommandBuilder } = require('@discordjs/builders');

function showHelp() {
  commands =
    "__The commands:__\n\n**/help** - Shows this list of commands.\n**/testbot** - Checks if the bot is online.\n**$dl <project>** - Provides the download link for the specified project. Use `$dl list` for a list of projects.\n**$faq <topic>** - Answers some general questions. Use `$faq list` for a list of topics.";
  return commands;
}

module.exports = {
	data: new SlashCommandBuilder()
	.setName('help')
	.setDescription('Shows a list of all commands'),
	async execute(interaction) {
		await interaction.reply(showHelp());
    console.log("help - Answer sent");
	},
};
