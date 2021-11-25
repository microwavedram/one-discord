const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('contextmenutest')
	.setDescription('test command for the context ui thing')
	.addStringOption(option => option.setName('text').setDescription('changes text shown').setRequired(true))
	,async execute(interaction) {
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setCustomId('primary')
			.setLabel('Click me')
			.setStyle('DANGER'),
			new MessageButton()
			.setLabel('Web Dashboard')
			.setStyle('LINK')
			.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
		)
		await interaction.reply({ content: interaction.options.getString('text'), components: [row]})
	},
};