import { MessageReaction, User } from 'discord.js';

import { AUTOROLE } from '../utils/constants';

export const reactionRemoveEvent = async (
	reaction: MessageReaction,
	user: User,
) => {
	if (reaction.message.partial) await reaction.message.fetch();

	const member = reaction.message.guild.member(user);

	if (reaction.message.id == AUTOROLE.experienceMessage) {
		if (reaction.emoji.name == AUTOROLE.emojis.beginner) {
			const role = reaction.message.guild.roles.get(AUTOROLE.roles.beginner);

			await member.roles.remove(role);
		}

		if (reaction.emoji.name == AUTOROLE.emojis.experienced) {
			const role = reaction.message.guild.roles.get(AUTOROLE.roles.experienced);

			await member.roles.remove(role);
		}

		if (reaction.emoji.name == AUTOROLE.emojis.expert) {
			const role = reaction.message.guild.roles.get(AUTOROLE.roles.expert);

			await member.roles.remove(role);
		}
	}

	if (reaction.message.id == AUTOROLE.helperMessage) {
		if (reaction.emoji.name == AUTOROLE.emojis.helper) {
			const role = reaction.message.guild.roles.get(AUTOROLE.roles.helper);

			await member.roles.remove(role);
		}
	}
};
