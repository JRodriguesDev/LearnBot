import {Events, MessageFlags, Interaction, Collection} from 'discord.js'

import {CustomClient, EventInteraction} from '#interfaces'

export const event: EventInteraction = {
	name: Events.InteractionCreate,
	async execute(interaction: Interaction) {
		if (!interaction.isChatInputCommand()) return;
        const client = interaction.client as CustomClient
		const command = client.commands.get(interaction.commandName);
		
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		const {cooldowns} = client 
		if (!cooldowns.has(command.data.name)) cooldowns.set(command.data.name, new Collection<string, number>())

		const now = Date.now()
		const timestamps = cooldowns.get(command.data.name)
		const cooldown_amout = (command.cooldown!) * 1000
		
		if (timestamps!.has(interaction.user.id)) {
			const expiration_time = timestamps!.get(interaction.user.id)! + cooldown_amout
			
			if (now < expiration_time) {
				const time_left = (expiration_time - now) / 100
				return interaction.reply({
					content: `Amir Não tem tanto tempo para você espere ${time_left.toFixed(1)}s para poder falar com amir usando /${command.data.name}`,
					flags: MessageFlags.Ephemeral
				})
			}
		}
		timestamps!.set(interaction.user.id, now)
		setTimeout(() => timestamps!.delete(interaction.user.id), cooldown_amout)

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: 'There was an error while executing this command!',
					flags: MessageFlags.Ephemeral,
				});
			} else {
				await interaction.reply({
					content: 'There was an error while executing this command!',
					flags: MessageFlags.Ephemeral,
				});
			}
		}
	},
};