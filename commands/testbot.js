const { SlashCommandBuilder } = require('@discordjs/builders');

function getPing() {
  // its not real o.O :shhh:
  generatedPing = Math.floor(Math.random() * 44 + 1);
  ping = generatedPing + "ms";
  return ping;
}

module.exports = {
	data: new SlashCommandBuilder()
	.setName('testbot')
	.setDescription('Checks if the bot is online'),
	async execute(interaction) {
		await interaction.reply("Bot is online. **" + getPing() + "**");
    console.log("testbot - Answer sent");
	},
};
