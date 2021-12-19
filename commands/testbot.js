const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('testbot')
	.setDescription('Checks if the bot is online'),
	execute: async (interaction, client) => {
    const msg = await interaction.reply({ content: "Bot is **online** ✅", fetchReply: true });

    await interaction.editReply({ content: `Bot is **online** ✅\n__⏳ Latency__\n- Bot Latency: \`${msg.createdTimestamp - interaction.createdTimestamp}ms\`\n- WebSocket Latency: \`${Math.round(client.ws.ping)}ms\`` });
    console.log("testbot - Answer sent");
	},
};
