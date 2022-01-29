const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('testbot')
	.setDescription('Checks if the bot is online'),
	execute: async (interaction, client) => {
    // First answer
    const msg = await interaction.reply({ content: "Bot is **online** ✅", fetchReply: true });

    // Edit reply once first answer is sent
    await interaction.editReply({ content: `Bot is **online** ✅\n__⏳ Latency__\n- Bot Latency: \`${msg.createdTimestamp - interaction.createdTimestamp}ms\`\n- WebSocket Latency: \`${Math.round(client.ws.ping)}ms\`` });
    console.log(`testbot - Answer sent, Latency was:\nBot: ${msg.createdTimestamp - interaction.createdTimestamp}ms\nWebSocket: ${Math.round(client.ws.ping)}ms`)
	},
};
